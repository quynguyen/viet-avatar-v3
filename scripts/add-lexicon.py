#!/usr/bin/env python3
"""Attach an English | Nam Bộ lexicon to every story page."""
from __future__ import annotations

import json
import re
from pathlib import Path

path = Path("/workspace/src/lib/story.json")
data = json.loads(path.read_text())

# Southern Vietnamese (Nam Bộ) glosses. Informal spellings match the book:
# hông, nha, lắm, xíu, đi thôi…
GLOSSARY: list[tuple[str, str]] = [
    ("season one", "mùa một"),
    ("season two", "mùa hai"),
    ("season three", "mùa ba"),
    ("season four", "mùa bốn"),
    ("the water season", "mùa nước"),
    ("the earth season", "mùa đất"),
    ("the fire season", "mùa lửa"),
    ("the air season", "mùa gió"),
    ("to move water", "làm nước"),
    ("move water", "làm nước"),
    ("learns to move water", "học làm nước"),
    ("waterbending", "thủy thuật"),
    ("earthbending", "thổ thuật"),
    ("firebending", "hỏa thuật"),
    ("airbending", "phong thuật"),
    ("blow the wind", "thổi gió"),
    ("blows the wind", "thổi gió"),
    ("was scared", "sợ"),
    ("so cold", "lạnh lắm"),
    ("a long, long time", "lâu lắm"),
    ("a long sleep", "ngủ lâu"),
    ("slept in the ice", "ngủ trong đá lạnh"),
    ("jumped out", "nhảy ra"),
    ("the ice broke", "đá lạnh bể"),
    ("moved the water", "làm nước"),
    ("time to go", "đi thôi"),
    ("keep going", "đi tiếp nha"),
    ("flew on", "bay tiếp"),
    ("very little", "nhỏ xíu"),
    ("so little", "nhỏ xíu"),
    ("so big", "to lắm"),
    ("so happy", "vui lắm"),
    ("so sad", "buồn lắm"),
    ("so tired", "mệt lắm"),
    ("so strong", "khỏe lắm"),
    ("so pretty", "đẹp lắm"),
    ("so fun", "vui lắm"),
    ("so strange", "lạ lắm"),
    ("night night", "ngủ ngon nha"),
    ("the end", "hết chuyện rồi"),
    ("story goes on", "chuyện còn nữa"),
    ("cannot see", "hông thấy"),
    ("did not work", "hông được"),
    ("does not want", "hông muốn"),
    ("did not want", "hông muốn"),
    ("did not only hit", "hông chỉ đánh"),
    ("is not kind", "hông hiền"),
    ("was not kind", "hông hiền"),
    ("was not scared", "hông sợ"),
    ("not angry fire", "hông phải giận"),
    ("no more burning", "hông đốt nữa"),
    ("could not burn", "hông đốt nữa"),
    ("slowly now", "từ từ nha"),
    ("it's okay", "được rồi"),
    ("they keep looking", "tìm mãi"),
    ("look for", "tìm"),
    ("friends", "bạn bè"),
    ("new friends", "bạn mới"),
    ("became a friend", "thành bạn"),
    ("to be a friend", "làm bạn"),
    ("hugged", "ôm"),
    ("smiled", "cười"),
    ("opened his eyes", "mở mắt"),
    ("wakes up", "thức dậy"),
    ("stood together", "đứng chung"),
    ("was ready", "sẵn sàng"),
    ("teacher", "thầy"),
    ("earth teacher", "thầy đất"),
    ("water teacher", "thầy nước"),
    ("stamped his foot", "giậm chân"),
    ("blue fire", "lửa xanh"),
    ("warm fire", "lửa ấm"),
    ("angry fire", "lửa giận"),
    ("flying bison", "bò bay"),
    ("polar bear-dog", "chó gấu"),
    ("snow village", "làng tuyết"),
    ("grandma", "bà nội"),
    ("fire ship", "tàu lửa"),
    ("empty", "vắng"),
    ("old home", "nhà cũ"),
    ("the north", "chỗ Bắc"),
    ("houses made of ice", "nhà bằng băng"),
    ("the moon was weak", "trăng yếu"),
    ("helped the moon", "giúp trăng"),
    ("city was safe", "thành phố xong"),
    ("season two will come", "mùa hai tới"),
    ("season three will come", "mùa ba tới"),
    ("season four will come", "mùa bốn tới"),
    ("season one ends", "mùa một xong"),
    ("four places", "bốn chỗ"),
    ("long ago", "hồi xưa"),
    ("blow wind", "thổi gió"),
    ("a mark on his face", "vết trên mặt"),
    ("used to chase", "hay đuổi"),
    ("took away", "lấy đi"),
    ("sat still", "ngồi im"),
    ("a good way", "cách hay"),
    ("did so well", "giỏi lắm"),
    ("the sun was warm", "trời nắng đẹp"),
    ("everyone was happy", "mọi người vui"),
    ("cannot move air yet", "chưa làm gió"),
    ("eyes went wide", "mắt tròn"),
    ("came too", "tới nữa"),
    ("is bald", "hói"),
    ("teaches", "dạy"),
    ("a man in a mask", "người đeo mặt nạ"),
    ("takes bending away", "lấy phép"),
    ("people were scared", "mọi người sợ"),
    ("friends stayed", "bạn bè ở đó"),
    ("appeared", "hiện ra"),
    ("was kind", "hiền"),
    ("blew the wind", "thổi gió"),
    ("friends hugged", "bạn bè ôm"),
    ("spirits", "hồn"),
    ("spirit world", "cõi hồn"),
    ("glowing gate", "cổng sáng"),
    ("the trees glow", "cây phát sáng"),
    ("strange animals", "thú lạ"),
    ("bright bridges", "cầu sáng"),
    ("light spirit", "hồn sáng"),
    ("dark spirit", "hồn tối"),
    ("choose the light", "chọn sáng"),
    ("changed color", "đổi màu"),
    ("grew very big", "to lên"),
    ("went away", "đi"),
    ("live together", "sống chung"),
    ("the world is different now", "thế giới khác rồi"),
    ("air people", "người gió"),
    ("does not want kings", "hông muốn vua"),
    ("kept Korra safe", "giữ Korra"),
    ("do not let", "hông để"),
    ("little but strong", "nhỏ mà mạnh"),
    ("found the way", "thấy đường"),
    ("a new home", "nhà mới"),
    ("yellow clothes", "áo vàng"),
    ("lay down", "nằm"),
    ("needed sleep", "cần ngủ"),
    ("became an air teacher", "thành thầy gió"),
    ("everyone clapped", "mọi người vỗ tay"),
    ("was proud", "tự hào"),
    ("rested", "nghỉ"),
    ("licked", "liếm"),
    ("gets well", "khỏe lại"),
    ("practiced standing", "tập đứng"),
    ("fell", "ngã"),
    ("stood", "đứng"),
    ("nudged", "đẩy"),
    ("an army", "quân"),
    ("gather all the earth", "gom đất"),
    ("waited", "chờ"),
    ("came back", "về"),
    ("was ready", "sẵn sàng"),
    ("giant iron person", "người sắt to"),
    ("stood in front", "đứng trước"),
    ("the vines glowed", "dây leo sáng"),
    ("they did it together", "cùng làm"),
    ("talked to", "nói với"),
    ("listened", "nghe"),
    ("stopped", "dừng"),
    ("the city was safe", "thành phố xong"),
    ("was calm", "yên"),
    ("held a friend's hand", "nắm tay bạn"),
    ("walked into the light", "đi vào ánh sáng"),
    ("the world was calm", "thế giới yên"),
    ("first season", "mùa một"),
    ("must learn", "phải học"),
    ("go with him", "đi cùng cậu"),
    ("South Pole", "cực Nam"),
    ("set out", "lên đường"),
    ("before the comet comes", "trước khi sao chổi tới"),
    ("the comet", "sao chổi"),
    ("white ice", "băng trắng"),
    ("a hundred-year sleep", "trăm năm ngủ"),
    ("must learn the wave", "phải học sóng"),
    ("his breath", "hơi thở"),
    ("was afraid", "sợ hãi"),
    ("cold sea", "biển lạnh"),
    ("a very, very long time", "rất, rất lâu"),
    ("when war came", "khi chiến tranh ập đến"),
    ("sealed in an iceberg", "phong trong tảng băng"),
    ("an iceberg", "tảng băng"),
    ("a hundred years", "một trăm năm"),
    ("the ocean swallowed them", "biển nuốt lấy họ"),
    ("two souls", "hai linh hồn"),
    ("glowing iceberg", "tảng băng phát sáng"),
    ("used waterbending", "dùng thủy thuật"),
    ("Southern Water Tribe", "Thủy tộc phương Nam"),
    ("young waterbender", "thủy nhân trẻ"),
    ("Fire Nation", "Hỏa quốc"),
    ("Prince Zuko", "Hoàng tử Zuko"),
    ("the Avatar", "Avatar"),
    ("flying lemur", "cáo bay"),
    ("Earth Kingdom", "Thổ quốc"),
    ("Air Nomads", "Phong tộc"),
    ("spirit world", "cõi hồn"),
    ("Republic City", "Cộng hòa Thành"),
    ("equalists", "phái bình quyền"),
    ("harmonic convergence", "hòa hợp thiên địa"),
    ("Avatar State", "trạng thái Avatar"),
    ("slept a long time", "ngủ lâu lắm"),
    ("helps the land", "giúp đất"),
    ("old man", "ông già"),
    ("cloth wing", "cánh vải"),
    ("glowing shrine", "đền sáng"),
    ("Great Plateau", "Cao nguyên lớn"),
    ("paraglider", "dù lượn"),
    ("Sheikah", "tộc Sheikah"),
    ("Kakariko", "làng Kakariko"),
    ("Divine Beasts", "Thú thần"),
    ("Master Sword", "Kiếm Master"),
    ("Korok forest", "rừng Korok"),
    ("Hyrule Castle", "lâu đài Hyrule"),
    ("a hundred years", "trăm năm"),
    ("a hundred-year sleep", "ngủ trăm năm"),
    ("kind robots", "robot hiền"),
    ("mean robots", "robot dữ"),
    ("special light", "ánh sáng đặc biệt"),
    ("the 1986 movie", "phim năm 1986"),
    ("hungry planet", "hành tinh đói"),
    ("keep going", "đi tiếp nha"),
    ("night night", "ngủ ngon nha"),
    ("the end", "hết chuyện rồi"),
    ("so tired", "mệt lắm"),
    ("did not run", "hông chạy"),
    ("was not scared", "hông sợ"),
    ("the light opened", "ánh sáng mở"),
    ("the sky was calm", "trời yên"),
    ("yellow car", "xe vàng"),
    ("yellow robot", "robot vàng"),
    ("the junkyard", "bãi xe"),
    ("did not talk", "hông nói"),
    ("played the radio", "bật radio"),
    ("keep going", "đi tiếp nha"),
    ("night night", "ngủ ngon nha"),
    ("blue hedgehog", "nhím xanh"),
    ("runs so fast", "chạy nhanh lắm"),
    ("small town", "thị trấn nhỏ"),
    ("gold rings", "vòng vàng"),
    ("too fast", "nhanh quá"),
]


def split_sents(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?…])\s+", text.strip())
    out = []
    for part in parts:
        part = part.strip().rstrip(".!?").strip()
        if part:
            out.append(part)
    return out


def sentence_pairs(en: str, vi: str) -> list[tuple[str, str]]:
    es, vs = split_sents(en), split_sents(vi)
    n = min(len(es), len(vs))
    if n >= 1:
        return list(zip(es[:n], vs[:n]))
    en, vi = en.strip().rstrip("."), vi.strip().rstrip(".")
    if en and vi:
        return [(en, vi)]
    return []


def nam_bo(vi: str, level: str) -> str:
    if level not in ("preschool", "primary"):
        return vi
    vi = re.sub(r"\bKhông\b", "Hông", vi)
    vi = re.sub(r"\bkhông\b", "hông", vi)
    vi = re.sub(r"\bnhé\b", "nha", vi)
    vi = re.sub(r"\bNhé\b", "Nha", vi)
    return vi


def add_row(rows: list[dict[str, str]], seen: set[str], en: str, vi: str, level: str) -> None:
    key = re.sub(r"\s+", " ", en).strip().lower()
    vi = nam_bo(re.sub(r"\s+", " ", vi).strip(), level)
    if not key or not vi or key in seen:
        return
    if key == vi.lower():
        return
    seen.add(key)
    rows.append({"en": en.strip().rstrip("."), "vi": vi.rstrip(".")})


def in_text(phrase: str, blob_l: str) -> bool:
    return bool(re.search(r"(?<![a-z])" + re.escape(phrase.lower()) + r"(?![a-z])", blob_l))


def lexicon_for_level(page: dict, level: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    seen: set[str] = set()
    en_text = page["text"][level]["en"]
    vi_text = page["text"][level]["vi"]
    blob_l = en_text.lower()

    min_len = 8 if level in ("preschool", "primary") else 12
    for en, vi in sentence_pairs(en_text, vi_text):
        if len(en) < min_len:
            continue
        add_row(rows, seen, en, vi, level)

    for en, vi in GLOSSARY:
        if in_text(en, blob_l):
            add_row(rows, seen, en, vi, level)

    words, phrases = [], []
    for row in rows:
        (phrases if " " in row["en"] else words).append(row)
    combined = words + phrases
    if len(combined) > 12:
        combined = combined[:12]
    return combined


LEVELS = ("preschool", "primary", "intermediate", "senior")
thin = []
for series in data["series"]:
    for season in series["seasons"]:
        for page in season["pages"]:
            by_level = {level: lexicon_for_level(page, level) for level in LEVELS}
            page["lexicon"] = by_level
            for level, lex in by_level.items():
                if len(lex) < 3:
                    thin.append((page["id"], level, len(lex), [r["en"] for r in lex]))

path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
counts = [
    len(p["lexicon"][level])
    for s in data["series"]
    for season in s["seasons"]
    for p in season["pages"]
    for level in LEVELS
]
print("slots", len(counts), "min", min(counts), "max", max(counts), "avg", round(sum(counts) / len(counts), 1))
print("thin", thin[:30])
