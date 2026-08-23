#!/usr/bin/env python3
"""Add Sonic live-action movie 2 (Knuckles) as a second season."""
from __future__ import annotations

import json
import re
from pathlib import Path

path = Path("/workspace/src/lib/story.json")
data = json.loads(path.read_text())
data["archived"] = False

LEVELS = ("preschool", "primary", "intermediate", "senior")

GLOSSARY: list[tuple[str, str]] = [
    ("movie two", "phim hai"),
    ("punches so hard", "đấm mạnh lắm"),
    ("two tails", "hai đuôi"),
    ("a yellow fox", "cáo vàng"),
    ("new friend", "bạn mới"),
    ("new friends", "bạn mới"),
    ("big fists", "nắm to"),
    ("so big", "to lắm"),
    ("so hard", "mạnh lắm"),
    ("so well done", "giỏi lắm"),
    ("so fun", "vui lắm"),
    ("night night", "ngủ ngon nha"),
    ("it's okay", "được rồi"),
    ("was tricked", "bị lừa"),
    ("he was tricked", "bị lừa"),
    ("baseball", "bóng chày"),
    ("ice cream", "kem"),
    ("master emerald", "Ngọc Chủ"),
    ("the emerald", "viên ngọc"),
    ("green emerald", "ngọc xanh"),
    ("echidna", "thú mỏ gai"),
    ("red warrior", "chiến binh đỏ"),
    ("small town", "thị trấn nhỏ"),
    ("friends", "bạn bè"),
    ("smiled", "cười"),
    ("hugged", "ôm"),
    ("stood together", "đứng chung"),
]


def page(i: int, pid: str, title_vi: str, title_en: str, text: dict) -> dict:
    return {
        "id": pid,
        "image": f"/illustrations/so2-{i:02d}.jpg?v=la",
        "file": f"so2-page-{i:02d}",
        "title": {"vi": title_vi, "en": title_en},
        "text": text,
        "lexicon": {level: [] for level in LEVELS},
    }


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


def lexicon_for_level(item: dict, level: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    seen: set[str] = set()
    en_text = item["text"][level]["en"]
    vi_text = item["text"][level]["vi"]
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
    return combined[:12]


so2 = {
    "id": "so2",
    "vi": "Phim 2",
    "en": "Movie 2",
    "tagline": {
        "vi": "Knuckles tới thị trấn nhỏ",
        "en": "Knuckles comes to the small town",
    },
    "pages": [
        page(
            0,
            "so2-cover",
            "Knuckles",
            "Knuckles",
            {
                "preschool": {
                    "vi": "Đây là chuyện Sonic. Phim hai. Có Knuckles. Màu đỏ. Đấm mạnh lắm.",
                    "en": "This is Sonic. Movie two. There is Knuckles. He is red. He punches so hard.",
                },
                "primary": {
                    "vi": "Đây là phim Sonic hai. Knuckles tới tìm Sonic. Cáo Tails cũng tới. Họ phải tìm một viên ngọc lớn.",
                    "en": "This is Sonic movie two. Knuckles comes to find Sonic. The fox Tails comes too. They must find a big emerald.",
                },
                "intermediate": {
                    "vi": "Phim hai mở bằng một thị trấn đã quen nhím xanh — rồi một nắm đấm đỏ bước qua vòng vàng. Knuckles không tới chơi. Cậu tới đòi món nợ của cả một tộc.",
                    "en": "Movie two opens on a town that already knows the blue hedgehog — then a red fist steps through a gold ring. Knuckles did not come to play. He came to collect a whole tribe's debt.",
                },
                "senior": {
                    "vi": "Sequel gia đình biết cách lớn: thêm một cáo hai đuôi, một chiến binh đỏ, và Idris Elba đọc danh dự như người đọc kinh. Green Hills chưa sẵn cho nắm đấm ấy.",
                    "en": "The family sequel knows how to grow: add a two-tailed fox, a red warrior, and Idris Elba reading honor like scripture. Green Hills was not ready for that fist.",
                },
            },
        ),
        page(
            1,
            "so2-hero",
            "Anh hùng",
            "Hero",
            {
                "preschool": {
                    "vi": "Sonic muốn làm anh hùng. Chạy. Cứu. Hơi lộn. Ồ.",
                    "en": "Sonic wanted to be a hero. He ran. He saved. A little messy. Oh.",
                },
                "primary": {
                    "vi": "Sonic ở Green Hills. Cậu muốn làm người hùng. Cậu giúp người. Cậu cũng làm hỏng một ít. Tom thở dài.",
                    "en": "Sonic lived in Green Hills. He wanted to be a hero. He helped people. He also broke a few things. Tom sighed.",
                },
                "intermediate": {
                    "vi": "Tốc độ đã có nhà. Giờ cậu muốn danh. Blue Justice — cái tên quá lớn cho một đứa trẻ còn học cách đứng yên.",
                    "en": "Speed already had a home. Now he wanted a name. Blue Justice — a title too big for a child still learning how to stand still.",
                },
                "senior": {
                    "vi": "Phim sequel hay bắt đầu bằng kiêu: đứa trẻ thắng mùa trước muốn mùa này là tượng. Green Hills chịu được nhím. Chưa chịu được anh hùng nghiệp dư.",
                    "en": "Sequels like to open on pride: the child who won last season wants this one to be a statue. Green Hills could hold a hedgehog. It could not yet hold an amateur hero.",
                },
            },
        ),
        page(
            2,
            "so2-fox",
            "Cáo",
            "The Fox",
            {
                "preschool": {
                    "vi": "Cáo vàng tới. Hai đuôi. Quay. Bay. Bạn mới.",
                    "en": "A yellow fox came. Two tails. They spun. He flew. A new friend.",
                },
                "primary": {
                    "vi": "Tails tìm Sonic. Cậu bé cáo có hai đuôi. Cậu biết bay. Cậu nói có người dữ đang tới.",
                    "en": "Tails looked for Sonic. The little fox had two tails. He could fly. He said a dangerous person was coming.",
                },
                "intermediate": {
                    "vi": "Miles Prower — Tails — tới bằng vòng, bằng máy, bằng lo. Hai đuôi không phải đồ chơi. Chúng là cách một đứa trẻ nhỏ đến kịp một cuộc chiến lớn.",
                    "en": "Miles Prower — Tails — arrived by ring, by gadget, by worry. Two tails were not a toy. They were how a small child arrived in time for a large war.",
                },
                "senior": {
                    "vi": "Sidekick trong phim gia đình không phải người theo. Là người tới trước nỗi sợ. Tails mang bản đồ, mang máy, mang một trái tim chưa biết Knuckles sẽ nặng cỡ nào.",
                    "en": "A sidekick in a family film is not a follower. He is the one who arrives ahead of the fear. Tails brought a map, a machine, and a heart that did not yet know how heavy Knuckles would be.",
                },
            },
        ),
        page(
            3,
            "so2-red",
            "Đỏ",
            "The Red One",
            {
                "preschool": {
                    "vi": "Knuckles tới. Đỏ. Nắm to. Mặt dữ. Ồ.",
                    "en": "Knuckles came. Red. Big fists. A mean face. Oh.",
                },
                "primary": {
                    "vi": "Knuckles là thú mỏ gai đỏ. Cậu rất khỏe. Cậu giận Sonic. Cậu muốn tìm viên ngọc.",
                    "en": "Knuckles was a red echidna. He was very strong. He was angry at Sonic. He wanted the emerald.",
                },
                "intermediate": {
                    "vi": "Cửa vòng mở. Một chiến binh đỏ bước ra — nắm đấm như đá, ngực trắng như mặt trăng khuyết. Knuckles không hỏi tên. Cậu hỏi món nợ.",
                    "en": "The ring opened. A red warrior stepped through — fists like stone, a white crescent on his chest. Knuckles did not ask a name. He asked for a debt.",
                },
                "senior": {
                    "vi": "Idris Elba không chơi dễ thương. Ông ta chơi một đứa trẻ mồ côi đội lốt võ sĩ: đỏ, danh dự, và một lịch sử không vừa thị trấn nhỏ. Khán giả trẻ hiểu ngay — nắm đấm ấy đang đau.",
                    "en": "Idris Elba does not play cute. He plays an orphan in a boxer's body: red, honorable, and a history too wide for a small town. Young viewers get it at once — those fists are in pain.",
                },
            },
        ),
        page(
            4,
            "so2-deal",
            "Hiệp ước",
            "The Deal",
            {
                "preschool": {
                    "vi": "Bác sĩ dữ gặp Knuckles. Nói ngọt. Hai người. Hiệp ước lạ.",
                    "en": "The mean doctor met Knuckles. Sweet words. Two people. A strange deal.",
                },
                "primary": {
                    "vi": "Robotnik nói với Knuckles. Ông ta muốn Sonic thua. Knuckles muốn ngọc. Họ đi chung. Hông phải bạn.",
                    "en": "Robotnik talked to Knuckles. He wanted Sonic to lose. Knuckles wanted the emerald. They went together. They were not friends.",
                },
                "intermediate": {
                    "vi": "Robotnik không cần bạn. Ông ta cần một nắm đấm. Knuckles không cần bác sĩ. Cậu cần đường tới Ngọc Chủ. Hai kẻ đói bắt tay — và chỉ một kẻ biết mình đang lừa.",
                    "en": "Robotnik did not need a friend. He needed a fist. Knuckles did not need a doctor. He needed a road to the Master Emerald. Two hungers shook hands — and only one knew it was a trick.",
                },
                "senior": {
                    "vi": "Jim Carrey bán danh dự như bán máy. Knuckles mua, vì cô đơn hay mua những lời nghe giống sứ mệnh. Hiệp ước xấu luôn bắt đầu bằng một sự thật: viên ngọc có thật.",
                    "en": "Jim Carrey sells honor the way he sells machines. Knuckles buys, because loneliness buys anything that sounds like a mission. A bad deal always begins with one true thing: the emerald is real.",
                },
            },
        ),
        page(
            5,
            "so2-smash",
            "Đấm",
            "The Punch",
            {
                "preschool": {
                    "vi": "Knuckles đấm. Nhà rung. Sonic chạy. Tails kéo. Chạy đi!",
                    "en": "Knuckles punched. The house shook. Sonic ran. Tails pulled. Run!",
                },
                "primary": {
                    "vi": "Knuckles đánh vào nhà Tom. Tường bể. Sonic phải chạy. Tails lái xe cứu cậu. Họ thoát.",
                    "en": "Knuckles hit Tom's house. The wall broke. Sonic had to run. Tails drove and saved him. They got away.",
                },
                "intermediate": {
                    "vi": "Nắm đỏ không gõ cửa. Nó vào nhà. Tốc độ lần đầu gặp thứ không chạy theo — thứ đứng lại và đấm. Tails kéo Sonic ra trước khi mái sập.",
                    "en": "The red fist did not knock. It came in. Speed met, for the first time, something that did not chase — something that stood and punched. Tails pulled Sonic out before the roof gave.",
                },
                "senior": {
                    "vi": "Cảnh này là cách sequel dạy: nhà không phải pháo đài. Một đứa trẻ đỏ, tin mình đúng, có thể làm sập chỗ một đứa trẻ xanh mới vừa được gọi là nhà. Đó là sợ thật, không phải trò đuổi.",
                    "en": "This scene is how the sequel teaches: a home is not a fort. A red child, sure he is right, can bring down the place a blue child had just learned to call home. That is real fear, not a chase gag.",
                },
            },
        ),
        page(
            6,
            "so2-emerald",
            "Ngọc",
            "The Emerald",
            {
                "preschool": {
                    "vi": "Ngọc xanh. To lắm. Sáng. Knuckles muốn. Cẩn thận.",
                    "en": "A green emerald. So big. It shone. Knuckles wanted it. Be careful.",
                },
                "primary": {
                    "vi": "Họ tìm Ngọc Chủ. Viên ngọc xanh rất mạnh. Ai giữ ngọc có thể đổi thế giới. Knuckles tin ngọc của tộc cậu.",
                    "en": "They looked for the Master Emerald. The green gem was very strong. Whoever held it could change the world. Knuckles believed it belonged to his people.",
                },
                "intermediate": {
                    "vi": "Ngọc Chủ không phải đồ chơi. Nó biến ý nghĩ thành sức. Tộc Knuckles gác nó. Tộc cú giấu nó. Sonic đứng giữa hai chuyện cũ mà cậu chưa sống.",
                    "en": "The Master Emerald was not a toy. It turned thought into force. Knuckles' people guarded it. The owls hid it. Sonic stood between two old stories he had not lived.",
                },
                "senior": {
                    "vi": "MacGuffin gia đình lần này có trọng lượng: không vàng, không súng — một viên đá nhớ cả một cuộc chiến trẻ con không chứng kiến. Knuckles không tham. Cậu nhớ.",
                    "en": "The family MacGuffin has weight this time: not gold, not guns — a stone that remembers a war the children did not watch. Knuckles is not greedy. He is remembering.",
                },
            },
        ),
        page(
            7,
            "so2-honor",
            "Danh dự",
            "Honor",
            {
                "preschool": {
                    "vi": "Sonic đánh. Knuckles đánh. Rồi dừng. Nhìn. Bạn được không?",
                    "en": "Sonic fought. Knuckles fought. Then they stopped. They looked. Could they be friends?",
                },
                "primary": {
                    "vi": "Sonic và Knuckles đánh nhau. Cả hai mạnh. Cả hai mệt. Họ hiểu nhau hơn. Knuckles hông phải xấu hết.",
                    "en": "Sonic and Knuckles fought each other. Both were strong. Both were tired. They understood each other more. Knuckles was not all bad.",
                },
                "intermediate": {
                    "vi": "Hai đứa trẻ đánh vì chuyện người lớn chết. Hết đấm, còn lại cùng một câu: ai bảo vệ những gì còn lại. Danh dự của Knuckles không phải giận. Là không bỏ.",
                    "en": "Two children fought a war grown-ups had died in. After the punches, one question was left: who guards what remains. Knuckles' honor was not anger. It was not leaving.",
                },
                "senior": {
                    "vi": "Đây là cảnh Idris Elba được viết cho: không diễn hề, không găng đỏ. Một võ sĩ nhỏ học rằng kẻ chạy kia cũng mất nhà. Khi hai đứa nhận ra điều đó, phim hết cần phản diện phụ.",
                    "en": "This is the scene Idris Elba was written for: no clowning, no red gloves. A small fighter learns that the one who runs also lost a home. Once the two children see that, the movie no longer needs a side villain.",
                },
            },
        ),
        page(
            8,
            "so2-trick",
            "Lừa",
            "The Trick",
            {
                "preschool": {
                    "vi": "Bác sĩ lấy ngọc. Knuckles sốc. Bị lừa. Buồn. Ồ.",
                    "en": "The doctor took the emerald. Knuckles was shocked. He was tricked. Sad. Oh.",
                },
                "primary": {
                    "vi": "Robotnik cướp Ngọc Chủ. Ông ta hông giữ lời. Knuckles thấy mình bị lừa. Cậu giận. Cậu cũng buồn.",
                    "en": "Robotnik stole the Master Emerald. He did not keep his word. Knuckles saw he was tricked. He was angry. He was sad too.",
                },
                "intermediate": {
                    "vi": "Robotnik không đánh Knuckles. Ông ta lấy thứ cậu tin. Đó là đòn chí mạng với người sống bằng danh dự: không đấm, chỉ lấy.",
                    "en": "Robotnik did not punch Knuckles. He took what Knuckles believed in. That is the killing blow for someone who lives on honor: no fist, only theft.",
                },
                "senior": {
                    "vi": "Phản diện thật không cần khỏe hơn nắm đấm. Chỉ cần biết đứa trẻ cô đơn sẽ giao ngọc nếu được gọi là đồng minh. Jim Carrey, lần này, không hài. Ông ta lạnh.",
                    "en": "A true villain does not need to be stronger than the fist. He only needs to know a lonely child will hand over the stone if someone calls him an ally. Jim Carrey, this time, is not funny. He is cold.",
                },
            },
        ),
        page(
            9,
            "so2-team",
            "Chung",
            "Together",
            {
                "preschool": {
                    "vi": "Ba bạn. Xanh. Vàng. Đỏ. Đánh máy to. Giỏi lắm.",
                    "en": "Three friends. Blue. Yellow. Red. They fought a big machine. So well done.",
                },
                "primary": {
                    "vi": "Sonic, Tails và Knuckles đánh chung. Robot to lắm. Knuckles đấm. Tails bay. Sonic chạy. Họ thắng.",
                    "en": "Sonic, Tails, and Knuckles fought together. The robot was so big. Knuckles punched. Tails flew. Sonic ran. They won.",
                },
                "intermediate": {
                    "vi": "Cái máy của bác sĩ nuốt trời Green Hills. Ba đứa trẻ — tốc độ, trí, nắm — lần đầu đứng một hàng. Super Sonic chỉ là hình. Hình thật là Knuckles không bỏ cuộc.",
                    "en": "The doctor's machine swallowed the Green Hills sky. Three children — speed, mind, fist — stood in one line for the first time. Super Sonic was only the shape. The real shape was Knuckles not walking away.",
                },
                "senior": {
                    "vi": "Cao trào sequel: không một anh hùng, một tổ. Vàng trên người Sonic, đỏ trên nắm Knuckles, hai đuôi giữ máy bay. Jim Carrey học bài cũ: dữ liệu không nuốt được ba đứa trẻ tin nhau.",
                    "en": "Sequel climax: not one hero, a set. Gold on Sonic, red on Knuckles' fist, two tails holding the plane. Jim Carrey learns the old lesson: data cannot swallow three children who believe each other.",
                },
            },
        ),
        page(
            10,
            "so2-family",
            "Nhà",
            "Home",
            {
                "preschool": {
                    "vi": "Knuckles ở lại. Bóng chày. Kem. Bạn mới. Ngủ ngon nha.",
                    "en": "Knuckles stayed. Baseball. Ice cream. New friends. Night night.",
                },
                "primary": {
                    "vi": "Knuckles hông về. Cậu ở Green Hills. Họ chơi bóng. Họ giữ ngọc chung. Nhà đủ chỗ cho màu đỏ.",
                    "en": "Knuckles did not go back. He stayed in Green Hills. They played ball. They guarded the emerald together. Home had room for red.",
                },
                "intermediate": {
                    "vi": "Phim khép bằng sân bóng, vì đó là thứ nắm đấm tìm được: không đền, chỉ một đội và ai đó không đuổi. Knuckles ngồi. Lần đầu, không gác một mình.",
                    "en": "The film closes on a ball field, because that is what the fist was looking for: no temple, only a team and someone who does not send you away. Knuckles sat. For the first time, he was not guarding alone.",
                },
                "senior": {
                    "vi": "Idris Elba được phép nghỉ: không kinh, không nợ. Còn lại kem, găng bóng chày, và một thị trấn chịu chứa thú mỏ gai. Ngủ được rồi — đấm đã đủ cho một đời trẻ.",
                    "en": "Idris Elba is allowed to rest: no scripture, no debt. What remains is ice cream, a baseball glove, and a town willing to hold an echidna. Sleep could come — punching had been enough for one young life.",
                },
            },
        ),
    ],
}

for item in so2["pages"]:
    item["lexicon"] = {level: lexicon_for_level(item, level) for level in LEVELS}

found = False
for series in data["series"]:
    if series["id"] != "sonic":
        continue
    series["seasons"] = [s for s in series["seasons"] if s["id"] != "so2"]
    series["seasons"].append(so2)
    found = True
    break

if not found:
    raise SystemExit("sonic series missing")

path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
thin = [
    (p["id"], level, len(p["lexicon"][level]))
    for p in so2["pages"]
    for level in LEVELS
    if len(p["lexicon"][level]) < 3
]
print("so2 pages", len(so2["pages"]))
print("thin", thin)
