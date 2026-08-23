#!/usr/bin/env python3
"""Add the Transformers series with the 1986 movie as book one."""
from __future__ import annotations

import json
from pathlib import Path

path = Path("/workspace/src/lib/story.json")
data = json.loads(path.read_text())
data["archived"] = False
data["tagline"] = {"vi": "Nhiều bộ truyện", "en": "Many stories"}


def page(i: int, pid: str, title_vi: str, title_en: str, text: dict) -> dict:
    return {
        "id": pid,
        "image": f"/illustrations/t1-{i:02d}.jpg",
        "file": f"t1-page-{i:02d}",
        "title": {"vi": title_vi, "en": title_en},
        "text": text,
        "lexicon": {"preschool": [], "primary": [], "intermediate": [], "senior": []},
    }


transformers = {
    "id": "transformers",
    "vi": "Transformers",
    "en": "Transformers",
    "coverTitle": {"vi": "Truyện Transformers", "en": "Transformers"},
    "seasons": [
        {
            "id": "t1986",
            "vi": "Phim 1986",
            "en": "The 1986 Movie",
            "tagline": {"vi": "Ánh sáng cứu mọi người", "en": "The light saves everyone"},
            "pages": [
                page(
                    0,
                    "t1-cover",
                    "Phim 1986",
                    "The 1986 Movie",
                    {
                        "preschool": {
                            "vi": "Đây là chuyện Transformers. Phim năm 1986. Robot hiền. Có ánh sáng đặc biệt.",
                            "en": "This is Transformers. The 1986 movie. Kind robots. There is a special light.",
                        },
                        "primary": {
                            "vi": "Đây là phim Transformers năm 1986. Robot hiền giúp người. Robot dữ muốn lấy hết. Một ánh sáng có thể cứu mọi người.",
                            "en": "This is the 1986 Transformers movie. Kind robots help people. Mean robots want to take everything. A special light can save everyone.",
                        },
                        "intermediate": {
                            "vi": "Năm 1986, cuộc chiến robot kéo dài. Autobot bảo vệ. Decepticon cướp. Chỉ ánh sáng Matrix mới dừng được hành tinh đói.",
                            "en": "In 1986 the robot war still went on. Autobots protect. Decepticons take. Only the Matrix light can stop the hungry planet.",
                        },
                        "senior": {
                            "vi": "Một trời kim loại, một ánh sáng giấu trong ngực người lãnh đạo. Phim năm ấy kể chuyện chiến tranh già — và một đứa trẻ robot phải học cầm ánh sáng.",
                            "en": "A metal sky, and a light hidden in a leader's chest. That year's film told of an old war — and of a young robot who had to learn to hold the light.",
                        },
                    },
                ),
                page(
                    1,
                    "t1-sides",
                    "Hai bên",
                    "Two Sides",
                    {
                        "preschool": {
                            "vi": "Có robot hiền. Có robot dữ. Robot hiền giúp. Robot dữ lấy. Phải chọn hiền nha.",
                            "en": "There are kind robots. There are mean robots. Kind robots help. Mean robots take. Choose kind.",
                        },
                        "primary": {
                            "vi": "Autobot là robot hiền. Decepticon là robot dữ. Họ không ưa nhau. Trẻ con cũng biết ai đáng tin.",
                            "en": "Autobots are kind robots. Decepticons are mean robots. They do not like each other. Even children can tell who to trust.",
                        },
                        "intermediate": {
                            "vi": "Hai tộc máy móc chia trời: Autobot giữ lời hứa, Decepticon giữ sức mạnh. Chiến tranh làm cả hai mệt.",
                            "en": "Two metal nations split the sky: Autobots keep promises, Decepticons keep power. The war tired both.",
                        },
                        "senior": {
                            "vi": "Không phải mọi cỗ máy đều biết thương. Một bên học cách quỳ xuống với kẻ yếu. Một bên chỉ học cách đứng trên.",
                            "en": "Not every machine learns mercy. One side learned to kneel beside the weak. The other learned only to stand above.",
                        },
                    },
                ),
                page(
                    2,
                    "t1-earth",
                    "Trái Đất",
                    "Earth",
                    {
                        "preschool": {
                            "vi": "Robot tới Trái Đất. Họ giả làm xe. Có bạn nhỏ. Mọi người chơi. Vui lắm.",
                            "en": "Robots came to Earth. They pretended to be cars. There is a little friend. Everyone played. So fun.",
                        },
                        "primary": {
                            "vi": "Trên Trái Đất, robot hiền giả làm xe tải và xe hơi. Một bạn nhỏ tên Daniel chơi với họ. Họ che chở thị trấn.",
                            "en": "On Earth, the kind robots pretended to be trucks and cars. A little friend named Daniel played with them. They kept the town safe.",
                        },
                        "intermediate": {
                            "vi": "Họ ngủ trong hình dạng xe, dậy khi trời tối. Trái Đất tưởng chỉ có máy — nhưng máy ấy biết thương người.",
                            "en": "They slept in the shapes of cars and woke at night. Earth thought they were only machines — but those machines knew how to care.",
                        },
                        "senior": {
                            "vi": "Một hành tinh xanh chứa chấp những người sắt đang trốn chiến tranh của chính họ. Tình bạn với một đứa trẻ — đó là cách họ nhớ mình còn là ai.",
                            "en": "A blue planet hid iron people fleeing their own war. Friendship with a child — that was how they remembered who they still were.",
                        },
                    },
                ),
                page(
                    3,
                    "t1-attack",
                    "Tới rồi",
                    "They Came",
                    {
                        "preschool": {
                            "vi": "Robot dữ tới. Các bạn sợ. Optimus đứng trước. Optimus hông chạy. Các bạn núp.",
                            "en": "Mean robots came. The friends were scared. Optimus stood in front. Optimus did not run. The friends hid.",
                        },
                        "primary": {
                            "vi": "Decepticon ập vào thành phố robot. Mọi người sợ. Optimus bước ra trước cửa. Cậu nói: các bạn ra sau đi.",
                            "en": "Decepticons rushed the robot city. Everyone was scared. Optimus stepped in front of the gate. He said: friends, go behind me.",
                        },
                        "intermediate": {
                            "vi": "Thành Autobot rung. Megatron muốn lấy. Optimus không để chiến tranh đụng vào người nhỏ.",
                            "en": "Autobot City shook. Megatron wanted to take it. Optimus would not let the war touch the little ones.",
                        },
                        "senior": {
                            "vi": "Khi trời kim loại tối lại, lãnh đạo không phải người hét to nhất. Là người đứng ngay cửa, để bóng mình che những đứa đang học cách sống.",
                            "en": "When the metal sky went dark, a leader was not the one who shouted loudest. It was the one who stood in the doorway, so his shadow could cover those still learning how to live.",
                        },
                    },
                ),
                page(
                    4,
                    "t1-optimus",
                    "Optimus",
                    "Optimus",
                    {
                        "preschool": {
                            "vi": "Optimus to. Optimus hiền. Optimus che mọi người. Optimus giỏi lắm. Bạn bè tin.",
                            "en": "Optimus is big. Optimus is kind. Optimus covers everyone. Optimus did so well. Friends trust him.",
                        },
                        "primary": {
                            "vi": "Optimus là thủ lĩnh hiền. Cậu lớn và mạnh, nhưng không thích đánh. Cậu chỉ đứng ra khi bạn bè cần.",
                            "en": "Optimus is the kind leader. He is big and strong, but he does not like to fight. He only stands up when his friends need him.",
                        },
                        "intermediate": {
                            "vi": "Optimus Prime mang sức của một xe tải và trái tim của một thầy. Megatron đối diện cậu — hai người từng là một trời.",
                            "en": "Optimus Prime carried a truck's strength and a teacher's heart. Megatron faced him — two who had once shared a sky.",
                        },
                        "senior": {
                            "vi": "Người ta nhớ Optimus không vì thép. Vì cậu biết đặt bàn tay lên vai kẻ yếu, rồi mới quay lại với kẻ mạnh.",
                            "en": "People remember Optimus not for the steel. For the way he set a hand on the weak, and only then turned to face the strong.",
                        },
                    },
                ),
                page(
                    5,
                    "t1-light",
                    "Ánh sáng",
                    "The Light",
                    {
                        "preschool": {
                            "vi": "Optimus mệt lắm. Optimus đưa ánh sáng cho Hot Rod. Này, cầm nha. Con giỏi mà.",
                            "en": "Optimus was so tired. Optimus gave the light to Hot Rod. Here. Hold it. You can do it.",
                        },
                        "primary": {
                            "vi": "Optimus quá mệt. Cậu đưa Hot Rod một ánh sáng vàng. Cậu nói: con cầm. Ánh sáng này cứu được mọi người.",
                            "en": "Optimus was too tired. He gave Hot Rod a golden light. He said: you hold it. This light can save everyone.",
                        },
                        "intermediate": {
                            "vi": "Matrix — ánh sáng lãnh đạo — rời ngực Optimus. Hot Rod còn trẻ, tay run, nhưng không trả lại.",
                            "en": "The Matrix — the light of leaders — left Optimus's chest. Hot Rod was young, his hands shook, but he did not give it back.",
                        },
                        "senior": {
                            "vi": "Có thứ ánh sáng không truyền bằng lệnh. Optimus chỉ còn hơi thở để nói: cầm lấy, rồi đi. Chiến tranh già trao việc cho một đứa chưa kịp lớn.",
                            "en": "Some lights are not passed by command. Optimus had only breath enough to say: take it, then go. An old war handed its work to a child who had not finished growing.",
                        },
                    },
                ),
                page(
                    6,
                    "t1-unicron",
                    "Hành tinh đói",
                    "Hungry Planet",
                    {
                        "preschool": {
                            "vi": "Có hành tinh to lắm. Tên Unicron. Unicron đói. Unicron muốn ăn trời. Phải lo.",
                            "en": "There is a planet so big. His name is Unicron. Unicron is hungry. Unicron wants to eat the sky. Be careful.",
                        },
                        "primary": {
                            "vi": "Unicron là hành tinh khổng lồ. Cậu ta đói và muốn ăn các vì sao. Megatron theo Unicron. Mọi người phải tìm ánh sáng.",
                            "en": "Unicron is a giant planet. He is hungry and wants to eat the stars. Megatron follows Unicron. Everyone must find the light.",
                        },
                        "intermediate": {
                            "vi": "Unicron — thần đói đội lốt hành tinh — nuốt thế giới như bánh. Megatron được ông ta đổi thành Galvatron. Trời hẹp lại.",
                            "en": "Unicron — a hungry god wearing a planet — swallowed worlds like bread. He remade Megatron into Galvatron. The sky grew small.",
                        },
                        "senior": {
                            "vi": "Đói không cần mặt để đáng sợ. Unicron là sự đói có quỹ đạo. Dưới bóng ông, ngay kẻ mạnh cũng trở thành đồ chơi.",
                            "en": "Hunger needs no face to be feared. Unicron was appetite given an orbit. Under his shadow, even the strong became toys.",
                        },
                    },
                ),
                page(
                    7,
                    "t1-run",
                    "Đi tiếp",
                    "Keep Going",
                    {
                        "preschool": {
                            "vi": "Hot Rod chạy với bạn. Bay tiếp. Tìm mãi. Hông bỏ ánh sáng. Đi tiếp nha.",
                            "en": "Hot Rod ran with friends. They flew on. They keep looking. Do not drop the light. Keep going.",
                        },
                        "primary": {
                            "vi": "Hot Rod và bạn bè bay đi tìm cách mở ánh sáng. Họ hỏi người lạ. Họ không dừng. Ánh sáng còn ấm trong tay.",
                            "en": "Hot Rod and his friends flew to find a way to open the light. They asked strangers. They did not stop. The light stayed warm in their hands.",
                        },
                        "intermediate": {
                            "vi": "Họ đi qua bãi phế liệu, qua tòa án lạ, qua những ông già robot. Kup kể chuyện. Hot Rod vẫn chưa hiểu mình đang lớn.",
                            "en": "They crossed junk worlds, strange courts, old robots. Kup told stories. Hot Rod still did not see that he was growing.",
                        },
                        "senior": {
                            "vi": "Đường cứu thế giới ít khi thẳng. Họ đi vòng qua rác và luật lạ — chỉ để học rằng ánh sáng chưa mở vì người cầm nó còn đang trốn chính mình.",
                            "en": "The road that saves a world is seldom straight. They circled through junk and strange law — only to learn the light would not open while its holder was still hiding from himself.",
                        },
                    },
                ),
                page(
                    8,
                    "t1-brave",
                    "Dũng cảm",
                    "Brave",
                    {
                        "preschool": {
                            "vi": "Hot Rod cầm ánh sáng. Ánh sáng ấm. Hot Rod hông sợ. Hot Rod thở. Rồi sáng.",
                            "en": "Hot Rod held the light. The light was warm. Hot Rod was not scared. Hot Rod breathed. Then it glowed.",
                        },
                        "primary": {
                            "vi": "Hot Rod đứng trước Unicron. Cậu hông chạy. Cậu mở tay. Ánh sáng vàng lớn lên. Cậu trở thành người lớn.",
                            "en": "Hot Rod stood in front of Unicron. He did not run. He opened his hands. The golden light grew. He became grown.",
                        },
                        "intermediate": {
                            "vi": "Matrix chỉ mở cho người dám chịu. Hot Rod không còn trốn sau Optimus. Ánh sáng đội lên — Rodimus Prime.",
                            "en": "The Matrix opens only for someone willing to carry it. Hot Rod stopped hiding behind Optimus. The light crowned him — Rodimus Prime.",
                        },
                        "senior": {
                            "vi": "Trở thành lãnh đạo không phải đội thêm thép. Là ở lại khi hành tinh há miệng. Hot Rod ở lại — và ánh sáng nhận ra cậu.",
                            "en": "Becoming a leader is not more steel. It is staying when a planet opens its mouth. Hot Rod stayed — and the light recognized him.",
                        },
                    },
                ),
                page(
                    9,
                    "t1-open",
                    "Mở sáng",
                    "The Light Opens",
                    {
                        "preschool": {
                            "vi": "Ánh sáng mở. Hành tinh đói dừng. Trời xong. Mọi người vui. Giỏi lắm.",
                            "en": "The light opened. The hungry planet stopped. The sky was safe. Everyone was happy. So well done.",
                        },
                        "primary": {
                            "vi": "Ánh sáng Matrix mở to. Unicron không ăn nữa. Galvatron chạy. Các robot hiền ôm nhau. Thành phố xong.",
                            "en": "The Matrix light opened wide. Unicron stopped eating. Galvatron ran. The kind robots hugged. The city was safe.",
                        },
                        "intermediate": {
                            "vi": "Một tia vàng xé bóng Unicron. Hành tinh đói vỡ thành sao lặng. Chiến tranh già, trong một phút, không còn chỗ đứng.",
                            "en": "A gold ray tore Unicron's shadow. The hungry planet broke into quiet stars. For one minute the old war had nowhere to stand.",
                        },
                        "senior": {
                            "vi": "Ánh sáng không đấm. Nó chỉ mở — và đói không chịu được chỗ có đủ. Unicron tan như một cơn ác mộng bị gọi đúng tên.",
                            "en": "The light did not strike. It only opened — and hunger cannot bear a place that is enough. Unicron came apart like a nightmare named out loud.",
                        },
                    },
                ),
                page(
                    10,
                    "t1-peace",
                    "Yên",
                    "Peace",
                    {
                        "preschool": {
                            "vi": "Trời yên. Hot Rod cười. Robot hiền ngồi. Hết chuyện rồi. Ngủ ngon nha.",
                            "en": "The sky was calm. Hot Rod smiled. Kind robots sat down. The end. Night night.",
                        },
                        "primary": {
                            "vi": "Sáng hôm sau trời trong. Hot Rod làm thủ lĩnh mới. Mọi người nghỉ. Chiến tranh im. Ngủ ngon nha.",
                            "en": "The next morning the sky was clear. Hot Rod was the new leader. Everyone rested. The war went quiet. Night night.",
                        },
                        "intermediate": {
                            "vi": "Rodimus nhìn bình minh kim loại. Còn việc, còn bạn, còn ánh sáng phải giữ. Nhưng hôm nay được ngồi. Được thở.",
                            "en": "Rodimus watched a metal dawn. There was still work, still friends, still a light to keep. But today they could sit. They could breathe.",
                        },
                        "senior": {
                            "vi": "Chiến tranh già khép lại không phải vì hết kẻ dữ — vì có đứa trẻ robot dám cầm ánh sáng mà không biến nó thành lệnh. Trời yên. Ngủ được rồi.",
                            "en": "The old war closed not because meanness ended — because a young robot held the light without turning it into a command. The sky was calm. Sleep could come.",
                        },
                    },
                ),
            ],
        }
    ],
}

ids = [s["id"] for s in data["series"]]
if "transformers" in ids:
    data["series"] = [s for s in data["series"] if s["id"] != "transformers"]
data["series"].append(transformers)
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("series", [s["id"] for s in data["series"]])
print("archived", data["archived"])
print("pages", len(transformers["seasons"][0]["pages"]))
