<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">E-Tickets 管理系统</div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                          <div  @click="loginModal = true">
                            {{ loginMsg }}
                          </div>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu :active-name="activePage" theme="light" width="auto">
                        <MenuItem name="movieList"><Icon type="videocamera"></Icon>电影管理</MenuItem>
                        <MenuItem name="scrollImg"><Icon type="images"></Icon>轮播管理</MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '5px', minHeight: '450px'}">
                      <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>

        <div id="modal" v-if="!adminUsername">
          <Modal
              v-model="loginModal"
              title="管理员登录"
              :loading="loading"
              okText="登录"
              @on-ok="adminLogin"
              @on-cancel="cancelLogin">
              <div>
                <Form :model="loginForm" class="login-form">
                  <FormItem prop="username">
                    <Input type="text" v-model="loginForm.username" placeholder="Username">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="Password">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                  </FormItem>
                </Form>
              </div>
          </Modal>
        </div>
    </div>
</template>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
  width: 200px;
  color: white;
  float: left;
  position: relative;
  font-size: 17px;

}
.layout-nav{
    width: 150px;
    margin: 0 auto;
    margin-right: 20px;
}

.login-form {
  padding: 0 40px;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      currentPage: '',
      activePage: '',
      loginModal: false,
      loading: true,

      loginMsg: '',

      adminUsername: '',

      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    adminLogin() {
      let vm = this
      axios.post('/api/session/admin', {
        username: vm.loginForm.username,
        password: vm.loginForm.password
      })
      .then((res) => {
        vm.loginModal = false
        this.$Message.success(`Hello, ${res.data.data.admin_username}`)
        this.adminUsername = res.data.data.admin_username
        this.loginMsg = `Hello, ${this.adminUsername}`
        console.log(res)
      })
      .catch((res) => {
        vm.loginModal = false
        console.log(err)
      })
    },

    cancelLogin() {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  },

  created() {
    this.currentPage = '电影管理'
    this.activePage = 'movieList'

    axios.get(`/api/admin/self`)
    .then(res => {
      this.adminUsername = res.data.data.username
      this.loginMsg = `Hello, ${this.adminUsername}`
    })
    .catch(res => {
      this.adminUsername = ''
      this.loginMsg = `管理员登录`
    })
  }
}
</script>