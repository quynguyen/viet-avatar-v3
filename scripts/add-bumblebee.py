#!/usr/bin/env python3
"""Add the Bumblebee (2018) movie as a Transformers season."""
from __future__ import annotations

import json
from pathlib import Path

path = Path("/workspace/src/lib/story.json")
data = json.loads(path.read_text())
data["archived"] = False


def page(i: int, pid: str, title_vi: str, title_en: str, text: dict) -> dict:
    return {
        "id": pid,
        "image": f"/illustrations/b1-{i:02d}.jpg?v=la",
        "file": f"b1-page-{i:02d}",
        "title": {"vi": title_vi, "en": title_en},
        "text": text,
        "lexicon": {"preschool": [], "primary": [], "intermediate": [], "senior": []},
    }


bumblebee = {
    "id": "bumblebee",
    "vi": "Bumblebee",
    "en": "Bumblebee",
    "tagline": {"vi": "Bạn vàng năm 1987", "en": "A yellow friend in 1987"},
    "pages": [
        page(
            0,
            "b1-cover",
            "Bumblebee",
            "Bumblebee",
            {
                "preschool": {
                    "vi": "Đây là chuyện Bumblebee. Năm 1987. Xe vàng. Có bạn tên Charlie.",
                    "en": "This is Bumblebee. The year is 1987. A yellow car. There is a friend named Charlie.",
                },
                "primary": {
                    "vi": "Đây là phim Bumblebee. Năm 1987 ở California. Charlie tìm một xe vàng. Xe ấy là robot hiền.",
                    "en": "This is the Bumblebee movie. 1987 in California. Charlie finds a yellow car. That car is a kind robot.",
                },
                "intermediate": {
                    "vi": "Năm 1987, một Autobot vàng rơi xuống Trái Đất. Charlie Watson — mười tám tuổi — tìm thấy cậu trong bãi xe. Tình bạn bắt đầu từ một chiếc Camaro cũ.",
                    "en": "In 1987 a yellow Autobot fell to Earth. Charlie Watson — eighteen — found him in a junkyard. Friendship began with an old Camaro.",
                },
                "senior": {
                    "vi": "Trước khi chiến tranh lớn ồn ào, có một mùa hè vàng: một robot mất tiếng, một cô gái mất chỗ đứng, và một chiếc xe biết nghe radio như người biết nghe tim.",
                    "en": "Before the loud war, there was a yellow summer: a robot without a voice, a girl without a place, and a car that listened to the radio the way some people listen to a heart.",
                },
            },
        ),
        page(
            1,
            "b1-fall",
            "Rơi xuống",
            "He Fell",
            {
                "preschool": {
                    "vi": "Robot vàng rơi. Đêm tối. Cậu đau. Cậu núp. Phải giấu.",
                    "en": "The yellow robot fell. Night was dark. He hurt. He hid. He had to hide.",
                },
                "primary": {
                    "vi": "Bumblebee rơi từ trời xuống rừng. Cậu bị thương. Cậu không nói được. Cậu phải trốn những robot dữ.",
                    "en": "Bumblebee fell from the sky into the forest. He was hurt. He could not speak. He had to hide from the mean robots.",
                },
                "intermediate": {
                    "vi": "Chiến tranh trên Cybertron đẩy Bumblebee xuống Trái Đất. Cậu mất tiếng. Chỉ còn một mắt sáng trong khói đêm.",
                    "en": "The war on Cybertron threw Bumblebee down to Earth. He lost his voice. Only one eye still glowed in the night smoke.",
                },
                "senior": {
                    "vi": "Người ta gửi đi một vệ sĩ, và đất chỉ nhận một đứa trẻ sắt bị gãy. Rừng 1987 nuốt lấy cậu — im lặng, đó là cách Trái Đất giữ bí mật.",
                    "en": "They sent a scout, and the ground received a broken iron child. The 1987 woods swallowed him — silence is how Earth keeps a secret.",
                },
            },
        ),
        page(
            2,
            "b1-junk",
            "Bãi xe",
            "The Junkyard",
            {
                "preschool": {
                    "vi": "Charlie muốn xe. Charlie thấy xe vàng. Xe cũ. Charlie mua. Vui lắm.",
                    "en": "Charlie wanted a car. Charlie saw a yellow car. The car was old. Charlie bought it. So fun.",
                },
                "primary": {
                    "vi": "Charlie đi bãi xe cũ. Cô thấy một Camaro vàng bụi. Rẻ. Cô kéo xe về nhà. Cô chưa biết xe ấy sống.",
                    "en": "Charlie went to the junkyard. She saw a dusty yellow Camaro. It was cheap. She pulled the car home. She did not know the car was alive yet.",
                },
                "intermediate": {
                    "vi": "Trong đống sắt, Charlie chọn đúng thứ không phải đồ chơi. Camaro vàng — bí mật đang ngủ, giá bằng một mùa hè.",
                    "en": "In a pile of steel, Charlie picked the one thing that was not a toy. A yellow Camaro — a sleeping secret, priced like one summer.",
                },
                "senior": {
                    "vi": "Bãi xe là nơi người ta vứt chuyện chưa xong. Charlie — vừa đủ lớn để lái, vừa đủ tổn để cần một chỗ ngồi — chọn chiếc vàng như chọn một lời hứa.",
                    "en": "A junkyard is where unfinished stories are left. Charlie — old enough to drive, hurt enough to need a seat — chose the yellow one the way you choose a promise.",
                },
            },
        ),
        page(
            3,
            "b1-awake",
            "Thức",
            "He Wakes",
            {
                "preschool": {
                    "vi": "Xe vàng dậy. Xe thành robot. Charlie sợ. Rồi Charlie cười. Bạn mới.",
                    "en": "The yellow car woke up. The car became a robot. Charlie was scared. Then Charlie smiled. A new friend.",
                },
                "primary": {
                    "vi": "Trong garage đêm, Camaro vàng đứng dậy. Bumblebee to và hiền. Charlie sợ một cái, rồi cô hiểu: cậu không muốn hại.",
                    "en": "In the garage at night, the yellow Camaro stood up. Bumblebee was big and kind. Charlie was scared for a second, then she understood: he did not want to hurt her.",
                },
                "intermediate": {
                    "vi": "Sắt xếp lại thành người. Charlie lùi một bước — rồi bước tới. Sợ biến thành tò mò, tò mò biến thành bạn.",
                    "en": "Steel folded into a person. Charlie stepped back — then stepped in. Fear became curiosity, and curiosity became a friend.",
                },
                "senior": {
                    "vi": "Có thứ thức trong garage không xin phép. Charlie không gọi cảnh sát. Cô gọi tên. Đôi khi đó là cách thế giới máy móc được phép ở lại.",
                    "en": "Something woke in the garage without asking. Charlie did not call the police. She called him a name. Sometimes that is how a machine world is allowed to stay.",
                },
            },
        ),
        page(
            4,
            "b1-radio",
            "Radio",
            "The Radio",
            {
                "preschool": {
                    "vi": "Bee hông nói. Bee bật radio. Nhạc. Charlie hiểu. Giỏi lắm.",
                    "en": "Bee did not talk. Bee played the radio. Songs. Charlie understood. So well done.",
                },
                "primary": {
                    "vi": "Bumblebee mất tiếng. Cậu bật radio để nói. Charlie nghe bài hát và hiểu cậu muốn gì. Hai người tập nói bằng nhạc.",
                    "en": "Bumblebee had no voice. He played the radio to talk. Charlie heard the songs and knew what he meant. They learned to speak with music.",
                },
                "intermediate": {
                    "vi": "Không cổ họng, chỉ có đài. Từng câu hát thành câu trả lời. Charlie học một ngôn ngữ không có chữ — chỉ có tần số.",
                    "en": "No throat, only a radio. Each song became an answer. Charlie learned a language with no letters — only stations.",
                },
                "senior": {
                    "vi": "Mất tiếng không phải mất lời. Bee cắt nhạc như người cắt hơi thở. Charlie — cô gái năm 1987 — trở thành người dịch một trái tim bằng cassette.",
                    "en": "Losing a voice is not losing speech. Bee cut songs the way people cut breath. Charlie — a girl of 1987 — became the translator of a heart on cassette.",
                },
            },
        ),
        page(
            5,
            "b1-charlie",
            "Charlie",
            "Charlie",
            {
                "preschool": {
                    "vi": "Charlie buồn. Ba đi rồi. Bee ở đó. Charlie cười xíu. Đỡ rồi.",
                    "en": "Charlie was sad. Dad was gone. Bee was there. Charlie smiled a little. That helped.",
                },
                "primary": {
                    "vi": "Charlie mười tám. Cô nhớ ba. Nhà hơi trống. Bumblebee đậu trước cửa. Cô không còn ngồi một mình.",
                    "en": "Charlie was eighteen. She missed her dad. The house felt empty. Bumblebee parked out front. She did not sit alone anymore.",
                },
                "intermediate": {
                    "vi": "Tuổi mười tám là cửa. Charlie đứng đó, chưa vào cũng chưa ra. Bee không chữa nỗi nhớ — cậu chỉ ở, và ở đã là đủ.",
                    "en": "Eighteen is a doorway. Charlie stood in it, not in and not out. Bee did not fix missing someone — he only stayed, and staying was enough.",
                },
                "senior": {
                    "vi": "Có thứ trống không xe nào lấp. Bee không thay ba. Cậu chỉ làm cái ghế bên cạnh đỡ lạnh. Năm 1987, đôi khi đó là cả một phép lạ.",
                    "en": "Some emptiness no car can fill. Bee did not replace a father. He only made the seat beside her less cold. In 1987, sometimes that was the whole miracle.",
                },
            },
        ),
        page(
            6,
            "b1-hunt",
            "Người ta tìm",
            "They Hunt",
            {
                "preschool": {
                    "vi": "Robot dữ tìm Bee. Người lạ tới. Charlie giấu. Bee núp. Phải lo.",
                    "en": "Mean robots looked for Bee. Strangers came. Charlie hid him. Bee hid. Be careful.",
                },
                "primary": {
                    "vi": "Decepticon tới Trái Đất tìm Bumblebee. Còn có người lính nữa. Charlie phải giấu bạn. Cô không kể với ai.",
                    "en": "Decepticons came to Earth looking for Bumblebee. There were soldiers too. Charlie had to hide her friend. She did not tell anyone.",
                },
                "intermediate": {
                    "vi": "Hai cuộc săn: máy móc dữ, và người muốn giữ bí mật cho riêng họ. Charlie đứng giữa — chọn Bee.",
                    "en": "Two hunts: mean machines, and people who wanted the secret for themselves. Charlie stood in the middle — and chose Bee.",
                },
                "senior": {
                    "vi": "Thế giới lớn luôn tới nhà nhỏ hỏi: mày giấu ai. Charlie không trả lời đúng. Cô trả lời bằng cách đứng trước cửa garage.",
                    "en": "The big world always comes to a small house and asks: who are you hiding. Charlie did not answer correctly. She answered by standing in front of the garage door.",
                },
            },
        ),
        page(
            7,
            "b1-guard",
            "Che",
            "He Guards",
            {
                "preschool": {
                    "vi": "Bee đứng trước. Charlie ở sau. Bee hông chạy. Bee che. Giỏi lắm.",
                    "en": "Bee stood in front. Charlie stayed behind. Bee did not run. Bee covered her. So well done.",
                },
                "primary": {
                    "vi": "Bumblebee bước ra trước Charlie. Cậu to. Cậu hiền nhưng không lùi. Cậu nói bằng người: không được đụng bạn tao.",
                    "en": "Bumblebee stepped in front of Charlie. He was big. He was kind, but he did not step back. His body said: you do not touch my friend.",
                },
                "intermediate": {
                    "vi": "Vệ sĩ không cần tiếng. Bee chỉ cần đứng đúng chỗ. Charlie, lần đầu, được ai đó chọn che.",
                    "en": "A guard does not need a voice. Bee only needed to stand in the right place. Charlie, for the first time, was the one someone chose to cover.",
                },
                "senior": {
                    "vi": "Người ta dạy robot chiến. Bee học một việc nhỏ hơn: biến ngực thành tường. Đêm ấy Charlie hiểu — bạn không phải thứ mình sửa, là thứ mình được phép đứng sau.",
                    "en": "They taught robots war. Bee learned a smaller job: to turn a chest into a wall. That night Charlie understood — a friend is not what you fix, it is what you are allowed to stand behind.",
                },
            },
        ),
        page(
            8,
            "b1-run",
            "Chạy",
            "They Run",
            {
                "preschool": {
                    "vi": "Charlie lái. Bee chạy. Đèn sáng. Biển tối. Đi tiếp nha.",
                    "en": "Charlie drove. Bee ran. Lights were bright. The sea was dark. Keep going.",
                },
                "primary": {
                    "vi": "Họ chạy trên đường biển đêm. Charlie lái Camaro vàng. Bumblebee bảo vệ. Họ không dừng. Họ tin nhau.",
                    "en": "They ran on the night coast road. Charlie drove the yellow Camaro. Bumblebee protected her. They did not stop. They trusted each other.",
                },
                "intermediate": {
                    "vi": "Đường 1987 ướt đèn. Hai người — một người cầm vô lăng, một người cầm chiến tranh — chạy như một.",
                    "en": "The 1987 road was wet with lights. Two people — one on the wheel, one on the war — ran as one.",
                },
                "senior": {
                    "vi": "Chạy không phải trốn mãi. Là chọn hướng. Charlie đạp ga; Bee đạp khoảng cách giữa cô và những kẻ muốn lấy cậu. Đó là tình bạn có tốc độ.",
                    "en": "Running is not hiding forever. It is choosing a direction. Charlie pressed the pedal; Bee pressed the distance between her and those who wanted him. That is friendship at speed.",
                },
            },
        ),
        page(
            9,
            "b1-free",
            "Tự do",
            "Free",
            {
                "preschool": {
                    "vi": "Xong rồi. Bee khỏe. Charlie cười. Trời sáng. Giỏi lắm.",
                    "en": "It was over. Bee was strong. Charlie smiled. The sky was bright. So well done.",
                },
                "primary": {
                    "vi": "Họ thắng. Bumblebee được tự do. Charlie đứng cạnh cậu trên vách đá. Biển yên. Cậu không phải núp nữa.",
                    "en": "They won. Bumblebee was free. Charlie stood beside him on the cliff. The sea was calm. He did not have to hide anymore.",
                },
                "intermediate": {
                    "vi": "Bí mật ra ánh sáng mà không bị lấy. Bee đứng như người, không như đồ. Charlie — lần đầu — thấy bạn mình nguyên.",
                    "en": "The secret came into the light and was not taken. Bee stood as a person, not as a thing. Charlie — for the first time — saw her friend whole.",
                },
                "senior": {
                    "vi": "Tự do của một cỗ máy là được đứng mà không bị mở. Tự do của Charlie là được ở cạnh mà không phải giải thích. Bình minh chỉ việc chứng kiến.",
                    "en": "Freedom for a machine is to stand without being opened. Freedom for Charlie is to stay beside him without explaining. Dawn only had to witness.",
                },
            },
        ),
        page(
            10,
            "b1-drive",
            "Lái",
            "Drive",
            {
                "preschool": {
                    "vi": "Charlie lái. Xe vàng. Biển đẹp. Bạn hiền. Ngủ ngon nha.",
                    "en": "Charlie drove. Yellow car. Pretty sea. Kind friend. Night night.",
                },
                "primary": {
                    "vi": "Charlie lái dọc biển lúc chiều. Bumblebee là xe, là bạn. Họ không nói nhiều. Đủ rồi. Ngủ ngon nha.",
                    "en": "Charlie drove along the sea in the evening. Bumblebee was the car, and the friend. They did not talk much. That was enough. Night night.",
                },
                "intermediate": {
                    "vi": "Camaro vàng cắt nắng cuối. Không cần radio lớn. Có đường, có bạn, có chỗ về. Hết một mùa hè.",
                    "en": "The yellow Camaro cut the last light. No need for a loud radio. There was a road, a friend, a place to go back to. One summer closed.",
                },
                "senior": {
                    "vi": "Phim khép bằng một đường biển, vì đó là thứ Trái Đất cho những kẻ đã chiến: không tượng, không lệnh — chỉ một chỗ ngồi và ai đó chịu lái cùng. Ngủ được rồi.",
                    "en": "The film closes on a coast road, because that is what Earth gives those who have fought: no statue, no order — only a seat and someone willing to drive. Sleep could come.",
                },
            },
        ),
    ],
}

for series in data["series"]:
    if series["id"] != "transformers":
        continue
    series["seasons"] = [s for s in series["seasons"] if s["id"] != "bumblebee"]
    series["seasons"].append(bumblebee)
    print("transformers seasons", [s["id"] for s in series["seasons"]])
    break
else:
    raise SystemExit("transformers series missing")

path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("pages", len(bumblebee["pages"]))
