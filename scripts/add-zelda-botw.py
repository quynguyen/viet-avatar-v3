#!/usr/bin/env python3
"""Append the Legend of Zelda series with a Breath of the Wild book."""
from __future__ import annotations

import json
from pathlib import Path

path = Path("/workspace/src/lib/story.json")
data = json.loads(path.read_text())


def page(i: int, pid: str, title_vi: str, title_en: str, text: dict) -> dict:
    return {
        "id": pid,
        "image": f"/illustrations/z1-{i:02d}.jpg",
        "file": f"z1-page-{i:02d}",
        "title": {"vi": title_vi, "en": title_en},
        "text": text,
        "lexicon": {"preschool": [], "primary": [], "intermediate": [], "senior": []},
    }


zelda = {
    "id": "zelda",
    "vi": "Huyền thoại Zelda",
    "en": "The Legend of Zelda",
    "coverTitle": {"vi": "Truyện Zelda", "en": "Zelda's Legend"},
    "seasons": [
        {
            "id": "botw",
            "vi": "Hơi thở hoang dã",
            "en": "Breath of the Wild",
            "tagline": {"vi": "Link thức dậy", "en": "Link wakes up"},
            "pages": [
                page(
                    0,
                    "z1-cover",
                    "Hơi thở hoang dã",
                    "Breath of the Wild",
                    {
                        "preschool": {
                            "vi": "Đây là chuyện Link. Link ngủ lâu lắm. Link thức dậy. Link giúp đất.",
                            "en": "This is Link. Link slept a long time. Link wakes up. Link helps the land.",
                        },
                        "primary": {
                            "vi": "Đây là chuyện Link ở Hyrule. Link ngủ một trăm năm. Cậu thức dậy. Cậu phải giúp đất.",
                            "en": "This is Link's story in Hyrule. Link slept a hundred years. He wakes up. He must help the land.",
                        },
                        "intermediate": {
                            "vi": "Link tỉnh trên cao nguyên sau một giấc ngủ trăm năm. Hyrule đang chờ. Cậu phải tìm Zelda và cứu đất.",
                            "en": "Link wakes on a high plateau after a hundred-year sleep. Hyrule is waiting. He must find Zelda and save the land.",
                        },
                        "senior": {
                            "vi": "Trên gió sớm của Hyrule, một anh hùng mở mắt — người đã ngủ khi thế giới gãy. Link bước ra, và đất nhớ cậu.",
                            "en": "On the early wind of Hyrule, a hero opens his eyes — one who slept while the world broke. Link steps out, and the land remembers him.",
                        },
                    },
                ),
                page(
                    1,
                    "z1-wake",
                    "Thức dậy",
                    "Wake Up",
                    {
                        "preschool": {
                            "vi": "Link mở mắt. Phòng sáng. Link ngồi dậy. Link buồn ngủ lắm.",
                            "en": "Link opened his eyes. The room was glowing. Link sat up. Link was so sleepy.",
                        },
                        "primary": {
                            "vi": "Link thức trong một đền sáng. Cậu ngồi dậy. Cơ thể còn yếu. Bên ngoài có trời.",
                            "en": "Link woke in a glowing shrine. He sat up. His body was still weak. Outside there was sky.",
                        },
                        "intermediate": {
                            "vi": "Trong Đền Hồi Sinh, ánh cam của người Sheikah đánh thức Link. Cậu bước ra ánh nắng lần đầu sau trăm năm.",
                            "en": "In the Shrine of Resurrection, orange Sheikah light woke Link. He stepped into sunlight for the first time in a hundred years.",
                        },
                        "senior": {
                            "vi": "Đá cổ thì thầm. Công nghệ cũ của Sheikah nâng một cơ thể đã ngủ quá lâu. Link ra khỏi lòng núi như một lời hứa được mở lại.",
                            "en": "Old stone whispered. Ancient Sheikah craft lifted a body that had slept too long. Link left the mountain's heart like a promise opened again.",
                        },
                    },
                ),
                page(
                    2,
                    "z1-oldman",
                    "Ông già",
                    "The Old Man",
                    {
                        "preschool": {
                            "vi": "Có ông già. Ông già hiền. Ông nấu ăn. Ông dạy Link. Link nghe.",
                            "en": "There is an old man. The old man is kind. He cooks. He teaches Link. Link listens.",
                        },
                        "primary": {
                            "vi": "Trên cao nguyên có ông già. Ông cho Link đồ ăn. Ông chỉ đường. Link tập leo và tập bay.",
                            "en": "On the plateau there is an old man. He gives Link food. He shows the way. Link practices climbing and flying.",
                        },
                        "intermediate": {
                            "vi": "Ông già trên Cao nguyên Lớn dạy Link sống: nấu, leo, bay bằng cánh vải. Ông chính là vua xưa, Rhoam.",
                            "en": "The old man on the Great Plateau taught Link to live: cook, climb, fly with a cloth wing. He was the old king, Rhoam.",
                        },
                        "senior": {
                            "vi": "Một ông già bên nồi canh — vua đã khuất, còn lại để đưa người ngủ trăm năm về với gió. Rhoam trao cánh, rồi hóa sương.",
                            "en": "An old man by a cooking pot — a lost king, staying long enough to return a hundred-year sleeper to the wind. Rhoam gave the wing, then became mist.",
                        },
                    },
                ),
                page(
                    3,
                    "z1-fly",
                    "Bay",
                    "Fly",
                    {
                        "preschool": {
                            "vi": "Link có cánh vải. Link nhảy. Link bay. Đất to lắm.",
                            "en": "Link got a cloth wing. Link jumped. Link flew. The land is so big.",
                        },
                        "primary": {
                            "vi": "Link cầm cánh vải. Cậu nhảy khỏi cao nguyên. Gió nâng cậu. Hyrule rộng dưới chân.",
                            "en": "Link held the cloth wing. He jumped off the plateau. The wind lifted him. Hyrule was wide below.",
                        },
                        "intermediate": {
                            "vi": "Với cánh dù, Link rời Cao nguyên Lớn. Thế giới mở ra: đồng, núi, sông, và lâu đài xa.",
                            "en": "With the paraglider, Link left the Great Plateau. The world opened: fields, mountains, rivers, and a distant castle.",
                        },
                        "senior": {
                            "vi": "Vải căng trong gió. Link rơi như một hạt giống được thả. Hyrule đón cậu bằng cả một chân trời.",
                            "en": "Cloth taut in the wind. Link fell like a seed let go. Hyrule received him with a whole horizon.",
                        },
                    },
                ),
                page(
                    4,
                    "z1-world",
                    "Đất rộng",
                    "The Wide Land",
                    {
                        "preschool": {
                            "vi": "Có ngựa. Có cỏ. Có tháp. Link nhìn. Đẹp lắm.",
                            "en": "There are horses. There is grass. There are towers. Link looked. So pretty.",
                        },
                        "primary": {
                            "vi": "Link cưỡi ngựa trên cỏ vàng. Có tháp cao. Có làng nhỏ. Cậu đi khắp nơi.",
                            "en": "Link rode a horse over golden grass. There were tall towers. There were little villages. He went everywhere.",
                        },
                        "intermediate": {
                            "vi": "Hyrule rộng và tự do. Link thám tháp Sheikah, kết bạn với ngựa, và học cách nghe đất.",
                            "en": "Hyrule was wide and free. Link climbed Sheikah towers, befriended horses, and learned to listen to the land.",
                        },
                        "senior": {
                            "vi": "Cỏ nghiêng như sóng. Ngựa thở hơi ấm. Những tháp cổ nhô lên như ngón tay của người xưa, chỉ đường cho kẻ vừa tỉnh.",
                            "en": "Grass leaned like waves. Horses breathed warm air. Ancient towers rose like fingers of the old people, pointing the way for one just waking.",
                        },
                    },
                ),
                page(
                    5,
                    "z1-village",
                    "Làng yên",
                    "Quiet Village",
                    {
                        "preschool": {
                            "vi": "Có làng yên. Có bà Impa. Impa biết chuyện xưa. Link nghe.",
                            "en": "There is a quiet village. There is Grandma Impa. Impa knows old stories. Link listened.",
                        },
                        "primary": {
                            "vi": "Link tới làng Kakariko. Bà Impa kể về Zelda. Impa bảo Link phải giúp bốn thú lớn.",
                            "en": "Link came to Kakariko village. Grandma Impa told him about Zelda. Impa said Link must help four great beasts.",
                        },
                        "intermediate": {
                            "vi": "Ở Kakariko, Impa của tộc Sheikah giữ trí nhớ của vương quốc. Bà giao Link nhiệm vụ giải phóng bốn Thú Thần.",
                            "en": "In Kakariko, Impa of the Sheikah kept the kingdom's memory. She gave Link the task of freeing the four Divine Beasts.",
                        },
                        "senior": {
                            "vi": "Đèn làng đỏ như trái tim nhỏ. Impa ngồi đó — người giữ chuyện, người không để Hyrule quên tên Zelda.",
                            "en": "Village lanterns glowed red like small hearts. Impa sat there — keeper of the story, the one who would not let Hyrule forget Zelda's name.",
                        },
                    },
                ),
                page(
                    6,
                    "z1-beasts",
                    "Bốn thú",
                    "Four Beasts",
                    {
                        "preschool": {
                            "vi": "Có bốn bạn to. Voi to. Chim to. Kỳ nhông to. Lạc đà to. Link giúp họ.",
                            "en": "There are four big friends. A big elephant. A big bird. A big lizard. A big camel. Link helped them.",
                        },
                        "primary": {
                            "vi": "Bốn thú máy đang buồn. Link vào trong. Link giúp họ. Các thú khỏe lại. Họ giúp Link.",
                            "en": "Four machine beasts were sad. Link went inside. Link helped them. The beasts got well. They helped Link.",
                        },
                        "intermediate": {
                            "vi": "Vah Ruta, Medoh, Rudania và Naboris — bốn Thú Thần. Link giải phóng họ. Họ chĩa sức mạnh về lâu đài.",
                            "en": "Vah Ruta, Medoh, Rudania, and Naboris — four Divine Beasts. Link freed them. They turned their power toward the castle.",
                        },
                        "senior": {
                            "vi": "Bốn cỗ máy khổng lồ nhớ các dũng sĩ cũ. Link đi qua nước, gió, lửa, và cát — trả họ về với trời.",
                            "en": "Four giant machines remembered old champions. Link crossed water, wind, fire, and sand — and gave them back to the sky.",
                        },
                    },
                ),
                page(
                    7,
                    "z1-zelda",
                    "Zelda",
                    "Zelda",
                    {
                        "preschool": {
                            "vi": "Có bạn Zelda. Zelda dũng cảm. Zelda giữ thú tối. Link phải giúp.",
                            "en": "There is a friend named Zelda. Zelda is brave. Zelda holds the dark thing. Link must help.",
                        },
                        "primary": {
                            "vi": "Zelda nói với Link trong gió. Cô giữ họa kiếp trong lâu đài. Cô chờ Link một trăm năm.",
                            "en": "Zelda spoke to Link on the wind. She held the calamity in the castle. She waited for Link for a hundred years.",
                        },
                        "intermediate": {
                            "vi": "Công chúa Zelda dùng sức thiêng giữ Ganon. Cô để lại ký ức trên cỏ — hoa công chúa lặng, và một giọng nói.",
                            "en": "Princess Zelda used sacred power to hold Ganon. She left memories in the grass — silent princess flowers, and a voice.",
                        },
                        "senior": {
                            "vi": "Zelda không đánh bằng kiếm. Cô đánh bằng thời gian: một trăm năm đứng giữa họa và đất, chờ người đã ngủ.",
                            "en": "Zelda did not fight with a sword. She fought with time: a hundred years standing between calamity and land, waiting for the one who slept.",
                        },
                    },
                ),
                page(
                    8,
                    "z1-sword",
                    "Kiếm đặc biệt",
                    "The Special Sword",
                    {
                        "preschool": {
                            "vi": "Có rừng. Có kiếm đặc biệt. Kiếm chờ. Link cầm kiếm. Cẩn thận nha.",
                            "en": "There is a forest. There is a special sword. The sword waited. Link took the sword. Be careful.",
                        },
                        "primary": {
                            "vi": "Trong rừng Korok, một thanh kiếm cũ chờ Link. Cậu kéo Thiên Kiếm lên. Rừng vui.",
                            "en": "In the Korok forest, an old sword waited for Link. He pulled out the Master Sword. The forest was glad.",
                        },
                        "intermediate": {
                            "vi": "Cây Deku canh Thanh Kiếm Trừ Tà. Link chứng tỏ trái tim. Kiếm xanh sáng trong tay cậu.",
                            "en": "The Deku Tree guarded the sword that seals the darkness. Link proved his heart. The sword glowed blue-green in his hand.",
                        },
                        "senior": {
                            "vi": "Trong sương Korok, thép nhớ chủ. Link đặt tay lên chuôi — và Hyrule, lần nữa, có một lưỡi sáng.",
                            "en": "In Korok mist, steel remembered its master. Link set his hand on the hilt — and Hyrule, once more, had a bright blade.",
                        },
                    },
                ),
                page(
                    9,
                    "z1-castle",
                    "Lâu đài",
                    "The Castle",
                    {
                        "preschool": {
                            "vi": "Có lâu đài. Trời hồng. Thú tối ở đó. Link đi vào. Bạn bè giúp.",
                            "en": "There is a castle. The sky is pink. The dark thing is there. Link went in. Friends helped.",
                        },
                        "primary": {
                            "vi": "Link vào lâu đài Hyrule. Bốn thú máy bắn hỗ trợ. Zelda gọi. Link không sợ.",
                            "en": "Link went into Hyrule Castle. The four machine beasts fired to help. Zelda called. Link was not scared.",
                        },
                        "intermediate": {
                            "vi": "Lâu đài quấn họa kiếp màu hồng. Link leo lên. Với Thiên Kiếm và lời Zelda, cậu đối mặt Ganon.",
                            "en": "The castle was wrapped in pink calamity. Link climbed. With the Master Sword and Zelda's voice, he faced Ganon.",
                        },
                        "senior": {
                            "vi": "Hồng khí như một vết thương trên trời. Link đi vào trái tim lâu đài — không để trả thù, mà để đánh thức một công chúa đang giữ cửa.",
                            "en": "Pink haze like a wound in the sky. Link entered the castle's heart — not for revenge, but to wake a princess who was holding the door.",
                        },
                    },
                ),
                page(
                    10,
                    "z1-peace",
                    "Yên",
                    "Peace",
                    {
                        "preschool": {
                            "vi": "Zelda cười. Đất xanh. Link ngồi. Hết chuyện rồi. Ngủ ngon nha.",
                            "en": "Zelda smiled. The land was green. Link sat down. The end. Night night.",
                        },
                        "primary": {
                            "vi": "Họa kiếp tan. Zelda trở về. Cỏ mọc. Link và Zelda đi trên đồng. Hyrule yên.",
                            "en": "The calamity faded. Zelda came back. Grass grew. Link and Zelda walked the field. Hyrule was calm.",
                        },
                        "intermediate": {
                            "vi": "Ganon tan thành ánh. Zelda đứng trên cỏ. Hyrule thở lại. Hai người bắt đầu việc mới: chữa đất.",
                            "en": "Ganon became light and vanished. Zelda stood in the grass. Hyrule breathed again. The two began a new task: healing the land.",
                        },
                        "senior": {
                            "vi": "Gió hạ. Zelda — trăm năm không già trong lời thề — nhìn Link như nhìn mùa xuân vừa về. Đất xanh. Chuyện cũ khép lại cho chuyện sống.",
                            "en": "The wind lowered. Zelda — a hundred years unaged inside a vow — looked at Link as one looks at a spring just returned. The land was green. The old story closed so living could begin.",
                        },
                    },
                ),
            ],
        }
    ],
}

if any(s["id"] == "zelda" for s in data["series"]):
    data["series"] = [s for s in data["series"] if s["id"] != "zelda"]
data["series"].append(zelda)
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("series", [s["id"] for s in data["series"]])
print("botw pages", len(zelda["seasons"][0]["pages"]))
