<template>
  <div>
    <div class="button-area">
      <Button type="success" @click="initCreateModal">添加电影</Button>
    </div>
    <div class="table-area">
      <Table size="medium" :columns="movieTableCols" :data="movieListFormatting"></Table>
    </div>
    <div class="page-area">
      <Page :total="movieAmount" :current="currentPage"  @on-change="pageChange" show-elevator></Page>
    </div>
    <div>
      <Modal
        v-model="movieInfoModal"
        title="电影详情"
        :loading="true"
        okText="更新影片"
        @on-ok="updateMovieInfo">
        <movie-item-edit :currentMovie="currentMovie" @movieChanged="currentMovieChange"></movie-item-edit>
      </Modal>
    </div>
    <div>
      <Modal
        v-model="movieCreateModal"
        title="创建电影"
        :loading="true"
        okText="创建影片"
        @on-ok="createMovie">
        <movie-item-edit :currentMovie="currentMovie" @movieChanged="currentMovieChange"></movie-item-edit>
      </Modal>
    </div>
  </div>
</template>

<style scoped>
.button-area {
  margin: 5px 0;
}

.table-area{
  margin: 15px 0;
}
</style>

<script>
import MovieItemEdit from '../components/MovieItemEdit'
import axios from 'axios';

export default {
  data() {
    return {
      movieAmount: 0,
      currentPage: 1,

      movieInfoModal: false,
      movieCreateModal: false,
      currentMovie: {
        movie_id: -1,
        title: '',
        director: '',
        status: '',
        poster: '',
        actors: '',
        tags: ''
      },

      movieTableCols: [
        {
          title: '电影名',
          key: 'title'
        },
        {
          title: '导演',
          key: 'director'
        },
        {
          title: '上映状态',
          key: 'statusStr'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'medium'
                },
                style: {
                  fontSize: '15px',
                  marginRight: '15px',
                  padding: '3px 12px'
                },
                on: {
                  click: () => {
                    this.showMovieInfo(params.index)
                  }
                }
              }, '查看'),
              h('span', {
                style: {
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],

      movieList: []
    }
  },

  computed: {
    movieListFormatting() {
      return this.movieList.map((movieItem) => {
        let statusMap = {
          0: '即将上映',
          1: '正在热映',
          2: '已经下映'
        }
        movieItem.statusStr = statusMap[movieItem.status]

        return movieItem
      })
    }
  },

  methods: {
    showMovieInfo(index) {
      this.movieInfoModal = true

      this.currentMovie = {
        index: index,
        movie_id: this.movieListFormatting[index].movie_id,
        title: this.movieListFormatting[index].title,
        director: this.movieListFormatting[index].director,
        status: this.movieListFormatting[index].status.toString(),
        poster: this.movieListFormatting[index].poster,
        actors: this.movieListFormatting[index].actors.reduce((x, y) => {
          return x + ',' + y
        }),
        tags: this.movieListFormatting[index].tags.reduce((x, y) => {
          return x + ',' + y
        })
      }
      console.log(this.currentMovie)
    },

    pageChange(page) {
      let pageSize = 10
      let vm = this

      axios.get(`/api/movies/page/${page}/page_size/${pageSize}`)
      .then((res) => {
        vm.movieAmount = res.data.data.movie_amount
        vm.movieList = res.data.data.movies
      })
      .catch((err) => {
        console.log(err)
      })

      console.log(this.currentPage)
    },

    initCreateModal() {
      this.currentMovie = {
        movie_id: -1,
        title: '',
        director: '',
        status: '',
        poster: '',
        actors: '',
        tags: ''
      }

      this.movieCreateModal = true
    },

    updateMovieInfo() {
      let vm = this
      axios.patch(`/api/movie/${vm.currentMovie.movie_id}/status`, {
        status: vm.currentMovie.status
      })
      .then(res => {
        console.log(res)
        vm.movieList[vm.currentMovie.index].status = res.data.data.status
        vm.$Message.success(res.data.message)
        vm.movieInfoModal = false
      })
      .catch(err => {
        vm.$Message.error(err)
        vm.movieInfoModal = false
      })
    },

    createMovie() {
      let vm = this
      axios.post(`/api/movie`, {
        movie_title: vm.currentMovie.title,
        poster: vm.currentMovie.poster,
        director: vm.currentMovie.director,
        actors: vm.currentMovie.actors.split(',').filter(item => {
          return item !== ''
        }),
        tags: vm.currentMovie.tags.split(',').filter(item => {
          return item !== ''
        }),
        status: vm.currentMovie.status
      })
      .then(res => {
        console.log(res)
        this.$Message.success(res.data.message);
        vm.movieCreateModal = false
      })
      .catch(err => {
        console.log(res)
        vm.movieCreateModal = false
      })
    },

    currentMovieChange(data) {
      this.currentMovie = data
      console.log(this.currentMovie)
    }
  },

  components: {
    MovieItemEdit
  },

  created() {
    let page = 1
    let pageSize = 10
    let vm = this
    axios.get(`/api/movies/page/${page}/page_size/${pageSize}`)
    .then((res) => {
      vm.movieAmount = res.data.data.movie_amount
      vm.movieList = res.data.data.movies
    })
    .catch((err) => {
      console.log(err)
    })

    this.currentPage = 1
  }
}
</script>
