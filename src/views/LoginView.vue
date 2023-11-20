<script setup lang="ts">
import { computed, ref } from 'vue'
// import { TextBox as KTextBox, Checkbox } from "@progress/kendo-vue-inputs";
// import { Button as KButton } from '@progress/kendo-vue-buttons'
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
  <div class="login-container">

    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title text-left" style="display: flex">
          <div class="title-img-wrap">
            <!--img src="@/assets/logo/logo_w.png" alt="" -->
            <font-awesome-icon icon="fa-solid fa-network-wired" size="3x"/>
          </div>
          <div class="title-text display-inline">
            Shop-by<br>
            <span class="gray-text text-md">샵바이 루팡 시스템</span><br>
            <span class="gray-text text-sm font-weight-normal">Version 1.0.0</span>
          </div>
        </h3>
        <!-- <lang-select class="set-language"/> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <font-awesome-icon icon="fa fa-user" />
        </span>
        <el-input placeholder="ID" name="username" type="text" auto-complete="on" class="login-input"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <font-awesome-icon icon="fas fa-key" />
        </span>
        <el-input :type="'password'" placeholder="Password" name="password" auto-complete="on" class="login-input"/>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" >Log-In</el-button>
    </el-form>
    <modals-container />
<!--    <change-password-->
<!--        :account-id="loginForm.username"-->
<!--    />-->
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
