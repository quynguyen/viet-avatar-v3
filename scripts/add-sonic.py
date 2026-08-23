#!/usr/bin/env python3
"""Add Sonic live-action movie 1 as a new series."""
from __future__ import annotations

import json
from pathlib import Path

path = Path("/workspace/src/lib/story.json")
data = json.loads(path.read_text())
data["archived"] = False


def page(i: int, pid: str, title_vi: str, title_en: str, text: dict) -> dict:
    return {
        "id": pid,
        "image": f"/illustrations/so1-{i:02d}.jpg?v=la",
        "file": f"so1-page-{i:02d}",
        "title": {"vi": title_vi, "en": title_en},
        "text": text,
        "lexicon": {"preschool": [], "primary": [], "intermediate": [], "senior": []},
    }


sonic_series = {
    "id": "sonic",
    "vi": "Sonic",
    "en": "Sonic",
    "coverTitle": {"vi": "Truyện Sonic", "en": "Sonic's Story"},
    "seasons": [
        {
            "id": "so1",
            "vi": "Phim 1",
            "en": "Movie 1",
            "tagline": {"vi": "Nhím xanh ở thị trấn nhỏ", "en": "A blue hedgehog in a small town"},
            "pages": [
                page(
                    0,
                    "so1-cover",
                    "Sonic",
                    "Sonic",
                    {
                        "preschool": {
                            "vi": "Đây là chuyện Sonic. Nhím xanh. Chạy nhanh lắm. Có bạn Tom.",
                            "en": "This is Sonic. A blue hedgehog. He runs so fast. There is a friend named Tom.",
                        },
                        "primary": {
                            "vi": "Đây là phim Sonic. Sonic sống bí mật ở thị trấn nhỏ. Bác sĩ dữ tìm cậu. Sheriff Tom giúp cậu.",
                            "en": "This is the Sonic movie. Sonic lives in secret in a small town. A mean doctor looks for him. Sheriff Tom helps him.",
                        },
                        "intermediate": {
                            "vi": "Sonic — nhím xanh từ thế giới khác — trốn ở Green Hills. Tốc độ của cậu đánh thức Robotnik. Tom Wachowski phải chọn: luật, hay bạn.",
                            "en": "Sonic — a blue hedgehog from another world — hides in Green Hills. His speed wakes Robotnik. Tom Wachowski must choose: the law, or a friend.",
                        },
                        "senior": {
                            "vi": "Phim mở bằng một thị trấn quá yên cho một đứa trẻ có sấm trong chân. Jim Carrey — bác sĩ muốn nhốt tốc độ vào lọ. Tom — người lớn lần đầu thấy thế giới có vòng vàng.",
                            "en": "The film opens on a town too quiet for a child with thunder in his feet. Jim Carrey — a doctor who wants speed in a jar. Tom — a grown-up seeing golden rings for the first time.",
                        },
                    },
                ),
                page(
                    1,
                    "so1-hide",
                    "Núp",
                    "He Hides",
                    {
                        "preschool": {
                            "vi": "Sonic ở nhà nhỏ. Ăn bánh. Buồn xíu. Phải núp. Chưa được ra.",
                            "en": "Sonic stays in a small house. He eats a donut. A little sad. He has to hide. Not time to go out.",
                        },
                        "primary": {
                            "vi": "Sonic sống trên gác. Cậu xem bóng chày. Cậu ăn donut. Cậu nhớ nhà. Người ta chưa được thấy cậu.",
                            "en": "Sonic lives in an attic. He watches baseball. He eats donuts. He misses home. People must not see him yet.",
                        },
                        "intermediate": {
                            "vi": "Gác mái Green Hills là đảo. Sonic đủ nhanh để đi khắp Trái Đất — và đủ cô đơn để ở yên một chỗ.",
                            "en": "The Green Hills attic is an island. Sonic is fast enough to cross Earth — and lonely enough to stay still.",
                        },
                        "senior": {
                            "vi": "Tốc độ không chữa cô đơn. Cậu ăn đường, xem người ta chơi bóng, và học cách là khách trên hành tinh mình cứu.",
                            "en": "Speed does not cure lonely. He eats sugar, watches people play ball, and learns how to be a guest on the planet he saved.",
                        },
                    },
                ),
                page(
                    2,
                    "so1-speed",
                    "Quá nhanh",
                    "Too Fast",
                    {
                        "preschool": {
                            "vi": "Sonic chạy. Sấm xanh. Đèn sáng. Trời kêu. Ồ!",
                            "en": "Sonic ran. Blue thunder. Lights went bright. The sky made a sound. Oh!",
                        },
                        "primary": {
                            "vi": "Sonic chơi bóng một mình. Cậu chạy quá nhanh. Một tia xanh đánh lên trời. Người lớn thấy. Hỏng rồi.",
                            "en": "Sonic played ball alone. He ran too fast. A blue flash hit the sky. Grown-ups saw it. Oh no.",
                        },
                        "intermediate": {
                            "vi": "Một đêm, cậu không giữ được chân. Sân bóng thành sấm. Tín hiệu bay xa — xa tới tai kẻ đang chờ một phép lạ để nhốt.",
                            "en": "One night he could not hold his feet. The field became thunder. The signal flew far — as far as someone waiting for a miracle to cage.",
                        },
                        "senior": {
                            "vi": "Cô đơn có cách tự tiết lộ: chạy hết sức. Green Hills sáng như cái nút. Thế giới máy móc ngẩng lên, mỉm cười.",
                            "en": "Loneliness has a way of telling on itself: running all-out. Green Hills lit up like a switch. The machine world looked up, and smiled.",
                        },
                    },
                ),
                page(
                    3,
                    "so1-doctor",
                    "Bác sĩ",
                    "The Doctor",
                    {
                        "preschool": {
                            "vi": "Bác sĩ dữ tới. Tóc dựng. Găng đỏ. Cười lạ. Muốn bắt Sonic.",
                            "en": "A mean doctor came. Wild hair. Red gloves. A strange smile. He wanted to catch Sonic.",
                        },
                        "primary": {
                            "vi": "Dr. Robotnik tới thị trấn. Ông ta thông minh nhưng không hiền. Ông ta muốn sức mạnh của Sonic. Xe đen đậu đầy đường.",
                            "en": "Dr. Robotnik came to town. He was smart but not kind. He wanted Sonic's power. Black trucks filled the road.",
                        },
                        "intermediate": {
                            "vi": "Robotnik không phải lính. Ông ta là trò đùa nguy hiểm: tóc, găng, và một cái đầu muốn biến sự sống thành dữ liệu.",
                            "en": "Robotnik was not a soldier. He was a dangerous joke: hair, gloves, and a mind that wanted to turn a life into data.",
                        },
                        "senior": {
                            "vi": "Jim Carrey chơi bác sĩ như một cơn sốt vui. Đằng sau tiếng cười là ý muốn: nếu chạy được, thì phải thuộc về ông. Thị trấn nhỏ chưa từng thấy kẻ đói như vậy.",
                            "en": "Jim Carrey plays the doctor like a joyful fever. Behind the laugh is a want: if it can run, it should belong to him. The small town had never met a hunger like that.",
                        },
                    },
                ),
                page(
                    4,
                    "so1-tom",
                    "Tom",
                    "Tom",
                    {
                        "preschool": {
                            "vi": "Sonic gặp Tom. Tom sợ. Rồi Tom hiền. Hai bạn. Được rồi.",
                            "en": "Sonic met Tom. Tom was scared. Then Tom was kind. Two friends. It's okay.",
                        },
                        "primary": {
                            "vi": "Sonic chạy vào nhà sheriff. Tom thấy nhím nói chuyện. Tom sốc. Rồi Tom tin. Cậu cần giúp.",
                            "en": "Sonic ran into the sheriff's house. Tom saw a talking hedgehog. Tom was shocked. Then Tom believed him. The boy needed help.",
                        },
                        "intermediate": {
                            "vi": "Luật của Tom là giữ yên. Sonic là chuyện trái luật. Tom chọn trái luật — vì một đứa trẻ đang bị săn.",
                            "en": "Tom's law was to keep the peace. Sonic was against the law. Tom chose against the law — because a child was being hunted.",
                        },
                        "senior": {
                            "vi": "Người lớn tốt không phải người không sợ. Tom sợ. Rồi ông ta đưa ghế. Đó là toàn bộ đạo đức của phim, gói trong một nhà bếp.",
                            "en": "A good grown-up is not one who is not scared. Tom was scared. Then he pulled out a chair. That is the whole ethic of the movie, packed into a kitchen.",
                        },
                    },
                ),
                page(
                    5,
                    "so1-chase",
                    "Rượt",
                    "The Chase",
                    {
                        "preschool": {
                            "vi": "Xe chạy. Sonic bám. Vòng vàng. Bee… không, drone bay. Chạy đi!",
                            "en": "The truck ran. Sonic held on. Golden rings. Drones flew. Run!",
                        },
                        "primary": {
                            "vi": "Tom lái xe. Sonic bám theo. Robotnik thả máy bay nhỏ. Sonic mở vòng vàng để đi xa. Họ phải chạy.",
                            "en": "Tom drove. Sonic held on. Robotnik sent little flying machines. Sonic opened golden rings to go far. They had to run.",
                        },
                        "intermediate": {
                            "vi": "Đường đêm thành đường vòng. Sonic ném vàng — cửa sang chỗ khác. Tom lái như người vừa biết thế giới có cửa.",
                            "en": "The night road became a ring-road. Sonic threw gold — a door to somewhere else. Tom drove like a man who had just learned the world has doors.",
                        },
                        "senior": {
                            "vi": "Rượt đuổi là cách phim dạy tin: không bài nói, chỉ có tay trên thành xe và ai đó không buông. Vòng vàng chỉ là hình của lời hứa.",
                            "en": "The chase is how the movie teaches trust: no speech, only a hand on the truck and someone who does not let go. The golden rings are just the shape of a promise.",
                        },
                    },
                ),
                page(
                    6,
                    "so1-friend",
                    "Bạn",
                    "Friends",
                    {
                        "preschool": {
                            "vi": "Tom và Sonic ngồi. Nói chuyện. Cười. Bạn hiền. Vui lắm.",
                            "en": "Tom and Sonic sat. They talked. They smiled. Kind friends. So fun.",
                        },
                        "primary": {
                            "vi": "Họ dừng xe. Tom nghe Sonic kể nhà. Sonic nghe Tom kể thị trấn. Hai người không còn lạ.",
                            "en": "They stopped the truck. Tom heard Sonic talk about home. Sonic heard Tom talk about the town. They were not strangers anymore.",
                        },
                        "intermediate": {
                            "vi": "Trên thùng xe, chiến tranh tạm nghỉ. Một sheriff và một nhím học cùng một bài: ở lại là dũng cảm hơn chạy.",
                            "en": "On the tailgate, the war paused. A sheriff and a hedgehog learned the same lesson: staying can be braver than running.",
                        },
                        "senior": {
                            "vi": "Phim gia đình sống ở chỗ này — không sấm, không găng đỏ. Chỉ hai kẻ lạc loài nhận ra họ cùng muốn một mái, dù một người có gai.",
                            "en": "The family movie lives here — no thunder, no red gloves. Only two strays realizing they both want a roof, even if one of them has quills.",
                        },
                    },
                ),
                page(
                    7,
                    "so1-machines",
                    "Máy",
                    "Machines",
                    {
                        "preschool": {
                            "vi": "Bác sĩ thả máy. Máy bay. Máy to. Ồ. Sonic phải lo.",
                            "en": "The doctor sent machines. Flying machines. A big machine. Oh. Sonic had to be careful.",
                        },
                        "primary": {
                            "vi": "Robotnik thả drone và robot trứng. Thị trấn nhỏ sợ. Sonic phải chạy và nghĩ. Tom không bỏ cậu.",
                            "en": "Robotnik sent drones and an egg robot. The small town was scared. Sonic had to run and think. Tom did not leave him.",
                        },
                        "intermediate": {
                            "vi": "Đồ chơi của bác sĩ không phải đồ chơi. Ông ta biến thị trấn thành phòng thí nghiệm. Sonic lần đầu thấy tốc độ không đủ.",
                            "en": "The doctor's toys were not toys. He turned the town into a lab. Sonic saw for the first time that speed was not enough.",
                        },
                        "senior": {
                            "vi": "Robotnik không ghét Sonic. Ông ta yêu kiểm soát. Máy bay là cách một cái ego ôm lấy trời. Green Hills, lần đầu, bị đo.",
                            "en": "Robotnik does not hate Sonic. He loves control. The drones are how an ego hugs the sky. Green Hills, for the first time, was being measured.",
                        },
                    },
                ),
                page(
                    8,
                    "so1-fight",
                    "Đánh",
                    "The Fight",
                    {
                        "preschool": {
                            "vi": "Sonic xoay. Xanh lắm. Máy bể. Tom reo. Giỏi lắm.",
                            "en": "Sonic spun. So blue. Machines broke. Tom cheered. So well done.",
                        },
                        "primary": {
                            "vi": "Sonic dùng tốc độ hết sức. Cậu xoay thành cầu sấm. Robotnik thua. Thị trấn được yên.",
                            "en": "Sonic used all his speed. He spun into a thunder ball. Robotnik lost. The town was safe.",
                        },
                        "intermediate": {
                            "vi": "Không phải giận — là chọn ở lại. Sonic đánh không để phá, để giữ Tom, giữ nhà, giữ chỗ ngồi trên thùng xe.",
                            "en": "Not anger — a choice to stay. Sonic fought not to smash, but to keep Tom, keep home, keep the seat on the tailgate.",
                        },
                        "senior": {
                            "vi": "Cao trào gia đình: sấm xanh, không máu. Robotnik học rằng dữ liệu không nuốt được một đứa trẻ được một người lớn tin. Đó là đòn chí mạng.",
                            "en": "A family climax: blue thunder, no blood. Robotnik learns that data cannot swallow a child a grown-up believes in. That is the killing blow.",
                        },
                    },
                ),
                page(
                    9,
                    "so1-stay",
                    "Ở lại",
                    "He Stays",
                    {
                        "preschool": {
                            "vi": "Trời sáng. Sonic đứng. Thị trấn đẹp. Được ở. Vui lắm.",
                            "en": "The sky was bright. Sonic stood. The town was pretty. He could stay. So fun.",
                        },
                        "primary": {
                            "vi": "Robotnik đi. Sonic không phải núp nữa. Green Hills thành nhà. Cậu đứng trên đồi và cười.",
                            "en": "Robotnik was gone. Sonic did not have to hide anymore. Green Hills became home. He stood on the hill and smiled.",
                        },
                        "intermediate": {
                            "vi": "Tự do không phải chạy thêm. Là được đứng nhìn thị trấn mà không sợ bị thấy. Sonic, lần đầu, ở.",
                            "en": "Freedom is not more running. It is standing, looking at a town, without fearing being seen. Sonic, for the first time, stayed.",
                        },
                        "senior": {
                            "vi": "Người tị nạn thắng không phải khi về được nơi cũ. Là khi nơi mới chịu nhận tên cậu. Bình minh chỉ việc chứng kiến.",
                            "en": "A refugee does not win by going back. He wins when the new place will say his name. Dawn only had to witness.",
                        },
                    },
                ),
                page(
                    10,
                    "so1-home",
                    "Nhà",
                    "Home",
                    {
                        "preschool": {
                            "vi": "Sonic và Tom ngồi. Đèn ấm. Sao. Bạn hiền. Ngủ ngon nha.",
                            "en": "Sonic and Tom sat. Warm lights. Stars. Kind friends. Night night.",
                        },
                        "primary": {
                            "vi": "Họ ngồi trước nhà. Thị trấn yên. Sonic có nhà. Tom có bạn lạ. Đủ rồi. Ngủ ngon nha.",
                            "en": "They sat in front of the house. The town was quiet. Sonic had a home. Tom had a strange friend. That was enough. Night night.",
                        },
                        "intermediate": {
                            "vi": "Phim khép bằng hiên nhà, vì đó là thứ tốc độ tìm được: không vương quốc, chỉ một chỗ ngồi và ai đó không đuổi.",
                            "en": "The film closes on a porch, because that is what speed was looking for: no kingdom, only a seat and someone who does not send you away.",
                        },
                        "senior": {
                            "vi": "Jim Carrey đã gào xong. Còn lại hai kẻ ngồi, đèn vàng, và một thị trấn chịu chứa nhím. Ngủ được rồi — chạy đã đủ cho một đời trẻ.",
                            "en": "Jim Carrey has finished shouting. What remains is two sitters, yellow lights, and a town willing to hold a hedgehog. Sleep could come — running had been enough for one young life.",
                        },
                    },
                ),
            ],
        }
    ],
}

data["series"] = [s for s in data["series"] if s["id"] != "sonic"]
data["series"].append(sonic_series)
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("series", [s["id"] for s in data["series"]])
print("pages", len(sonic_series["seasons"][0]["pages"]))
