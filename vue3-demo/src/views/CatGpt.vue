<template>
    <div class="cat-body">
        <div>
            <div class="cat-container">
                <h1 class="text-center cat-title pt-4">CatGPT</h1>
                <div class="text-center fs-6 fst-italic">What if ChatGPT were a cat?</div>
                <div ref="chatWrapRef" class="cat-wrap my-3">
                    <div v-for="(item, index) in chat" :key="index">
                        <div v-if="item.author == 'cat'" class="c-content c-b-cat">
                            <div class="c-wrap d-flex">
                                <img class="me-2" src="../../public/cat.jpg" />
                                <div class="content">{{ item.content }}
                                    <span v-if="item.showAnimation" class="animation-text"></span>
                                </div>

                            </div>
                        </div>
                        <div v-else class="c-content">
                            <div class="c-wrap d-flex">
                                <img class="me-2" src="../../public/user.png" />
                                <div class="content">{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex input-box text-center align-items-center">
                    <input ref="inputRef" @keypress.enter="askCat" v-model="message" class="w-100" type="text"
                        placeholder="Type your message here" />
                    <div @click="askCat" class="btn-icon ms-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path fill="currentColor"
                                d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                        </svg>
                    </div>
                </div>
                <div class="about text-center mt-2 fs-6">
                    This site was created by <a href="https://github.com/vn69" target="_blank"
                        class="text-reset">Đoàn Nguyễn</a>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from "vue"
import catSound from '../sound/cat-sound2.wav'
import { useSound } from '@vueuse/sound'
const activeSound = useSound(catSound, { playbackRate: 1.5 })

const chat = ref([])
const isChatting = ref(false)
const message = ref("")
const inputRef = ref(null)
const chatWrapRef = ref(null)


const catTalk = (content = " meow", isDone) => {
    const length = chat.value.length - 1

    if (isDone) {
        chat.value[length].showAnimation = false
        return
    }
    chat.value[length].content += content
}
const awaitRandom = async (msDefault) => {
    const ms = msDefault || Math.random() * 300 + 200
    return new Promise(resolve => setTimeout(resolve, ms));
}
const talk = async (arr) => {
    await awaitRandom(1000)
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        await awaitRandom()
        activeSound.play()
        catTalk(" " + item)
        chatWrapRef.value.scrollTop = chatWrapRef.value.scrollHeight

    }
    catTalk("", true)
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const askCat = async () => {
    // return
    const youText = message.value.trim().toLocaleLowerCase()
    if (!youText || isChatting.value) return
    const youMessage = {
        author: "you",
        content: youText
    }
    chat.value.push(youMessage)
    const catMessage = {
        author: "cat",
        content: "",
        showAnimation: true,
    }
    chat.value.push(catMessage)
    let contentArr = []
    let mes = ""
    switch (youText) {
        case "meow":
        case "meo":
            mes = "Bắt chước là hành động của kẻ tiểu nhân!"
            contentArr = mes.split(" ")
            break;
        case "woof":
        case "gâu":
            mes = "Ngoan lắm!"
            contentArr = mes.split(" ")
            break;
        case "shut up":
        case "câm mồm":
            for (let i = 0; i < 1000; i++) {
                contentArr.push("meow")
            }
            contentArr.push("meow.")
            break;

        default:
            const timeSay = getRandomArbitrary(1, 10)
            for (let i = 0; i < timeSay - 1; i++) {
                contentArr.push("meow")
            }
            contentArr.push("meow.")
            break;
    }
    message.value = ""
    isChatting.value = true
    await nextTick()
    chatWrapRef.value.scrollTop = chatWrapRef.value.scrollHeight
    await talk(contentArr)
    isChatting.value = false
    inputRef.value.focus()
}

</script>

<style scoped>
.cat-title {
    font-size: 64px;
    font-weight: bold;
    margin-bottom: 0px;
}

.cat-body {
    background-color: #343541;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    height: 100vh;
}

.cat-container {
    margin: auto;
}

.cat-wrap {
    width: 100%;
    height: 65vh;
    overflow: auto;
}

.input-box {
    max-width: 500px;
    width: 80%;
    margin: auto;
}

.input-box input {
    background-color: #40414F;
    border: none;
    color: #ececf1;
    font-size: 1em;
    padding: 1em;
    border-radius: 5px;
    outline: none;
}

.about {
    color: #757575;
}

.c-content {}

.btn-icon {
    width: 28px;
    color: #ececf1;
}

.c-wrap {
    width: 80%;
    margin: auto;
    padding: 20px 0;
}

.c-content img {
    min-width: 30px;
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 6px;
}

.c-content .content {}

.c-b-cat {
    background-color: #444654;
}

.animation-text {
    animation: blinkTextCursor 1s steps(44) infinite normal;
    height: 30px;
    border-right: 12px solid rgba(255, 255, 255, .75);
}

@keyframes blinkTextCursor {
    from {
        border-right-color: rgba(255, 255, 255, .75);
    }

    to {
        border-right-color: transparent;
    }
}

.cat-wrap::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
}

.cat-wrap::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #6e6f74;
}
</style>
