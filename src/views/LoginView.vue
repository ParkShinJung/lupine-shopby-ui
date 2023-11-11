<script setup lang="ts">
import { computed, ref } from 'vue'
import { TextBox as KTextBox, Checkbox } from "@progress/kendo-vue-inputs";
import { Button as KButton } from '@progress/kendo-vue-buttons'
import { useRouter } from 'vue-router'

const id = ref('')
const pw = ref('')

const router = useRouter()

const validated = computed(() => !!(id.value && pw.value))

const viewDashBoard = async () => {
  if (!id.value && !pw.value) {
    return false
  }
  const checkParams = {
    'accountPassword': pw.value,
    'langType': 'ko'
  }

  /*  this.$http.post(
      'http://api-farm.echoss.com/accounts/checkAccount/' + id.value, checkParams
    ).then((response) => {
      this.accountInfo = response.data
      if (!this.accountInfo.accountIdMatched || !this.accountInfo.accountPasswordMatched) {
        console.error(this.$t('login.error_user_info'))
        return
      }
      if (!this.accountInfo.adminAccess) {
        console.error(this.$t('login.admin_access_fail'))
        return
      }
    })*/


  try {
    const res = await fetch("http://api-farm.echoss.com/accounts/checkAccount/" + id.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkParams)
    })

    res.status

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    } else {
      router.push({
        path: `/dashboard`
      });
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <html>
  <div :class="$style.layout">
    <div :class="$style['title-layout']">
      <div :class="$style['first-title']">축제식 양식장</div>
      <div :class="$style['second-title']">모니터링 시스템</div>
    </div>
    <form :class="$style.form" :novalidate="true">
      <KTextBox
          v-model="id"
          :type="'text'"
          :class="$style.id"
          placeholder="아이디"
      />
      <KTextBox
          v-model="pw"
          :class="$style.pw"
          :type="'password'"
          placeholder="비밀번호"
      />
      <div>
        <checkbox :class="$style.checkbox"> <span style="margin-left: 0.5rem">아이디 저장</span></checkbox>
      </div>
      <KButton
          type="button"
          :disablecd="!validated"
          :class="$style.btn"
          :style="[validated ? { backgroundColor: '#3888f5' } : { backgroundColor: '#d0d5e4' }]"
          @click="() => viewDashBoard()"
      >
        로그인
      </KButton>
    </form>
  </div>
  </html>
</template>

<style module scoped lang="scss">
html {
  height: 100vh;
  margin: 0px;
  padding: 0px;
  background-color: #EDF2F9
}

.layout {
  height: 100%;
  width: 100%;
}

.title-layout {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 56px 24px;
}

%title-font {
  font-family: 'Pretendard M', serif;
  font-size: 24px;
}

.first-title {
  @extend %title-font;

  color: #3888f5;
}

.second-title {
  @extend %title-font;

  color: #000000;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 0 24px;
}

%input {
  height: 56px;
}

.id {
  @extend %input;
  margin-top: 24px;
}

.pw {
  @extend %input;
  margin-top: 8px;
}

.checkbox {
  height: 32px;
  margin-top: 16px;
}

.btn {
  height: 15vw;
  margin-top: 5vw;
  border: 0;
  color: white;
}
</style>
