<template>
  <div>
    <div class="button-area">
      <Button type="success">添加电影</Button>
    </div>
    <div class="table-area">
      <Table size="medium" :columns="movieTableCols" :data="movieListFormatting"></Table>
    </div>
    <div class="page-area">
      <Page :total="movieAmount" show-elevator></Page>
    </div>
    <div class="">
      <Modal
        v-model="movieInfoModal"
        title="电影详情"
        :loading="true"
        @on-ok="updateMovieInfo">
        <div>
          <Row>
            <Col span="8">
              <div class="movie-poster">
                <img :src="currentMovie.poster" height="240" width="150" alt="movie-poster" />
              </div>
              <div class="poster-upload">
                <Upload action="/api/movie/poster" name="poster">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传海报</Button>
                </Upload>
              </div>
            </Col>
            <Col span="16">
              <div>
                <Form :model="currentMovie" :label-width="80">
                  <FormItem label="电影名">
                    <Input v-model="currentMovie.title" placeholder="Movie title"></Input>
                  </FormItem>
                  <FormItem label="导演">
                    <Input v-model="currentMovie.director" placeholder="Director"></Input>
                  </FormItem>
                  <FormItem label="状态">
                    <Select v-model="currentMovie.status">
                      <Option value="0">即将上映</Option>
                      <Option value="1">正在热映</Option>
                      <Option value="2">已经下映</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="演员">
                    <Input v-model="currentMovie.actors" placeholder="Actors"></Input>
                  </FormItem>
                  <FormItem label="标签">
                    <Input v-model="currentMovie.tags" placeholder="Tags"></Input>
                  </FormItem>
                  </FormItem>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
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

.movie-poster {
  text-align: center;
  margin-bottom: 5px;
}

.poster-upload {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      movieAmount: 102,
      movieInfoModal: false,
      currentMovie: {
        movie_id: -1,
        title: '',
        director: '',
        status: '',
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

      movieList: [
        {
          movie_id: 7,
          title: "The Dark Knight",
          director: 'Christopher Nolan',
          poster: "/images/poster/the-dark-knight.jpg",
          status: 1,
          actors: ['actor1', 'actor2', 'actor3'],
          tags: ['tag1', 'tag2']
        },
        {
          movie_id: 8,
          title: "Inception",
          director: 'Christopher Nolan',
          poster: "/images/poster/inception.jpg",
          status: 1,
          actors: ['actor1', 'actor2', 'actor3'],
          tags: ['tag1', 'tag2']
        },
        {
          movie_id: 9,
          title: "Dunkirk",
          director: 'Christopher Nolan',
          poster: "/images/poster/dunkirk.jpg",
          status: 1,
          actors: ['actor1', 'actor2', 'actor3'],
          tags: ['tag1', 'tag2']
        },
        {
          movie_id: 10,
          title: "Interstellar",
          director: 'Christopher Nolan',
          poster: "/images/poster/interstellar.jpg",
          status: 1,
          actors: ['actor1', 'actor2', 'actor3'],
          tags: ['tag1', 'tag2']
        }
      ]
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
        movie_id: this.movieListFormatting[index].movie_id,
        title: this.movieListFormatting[index].title,
        director: this.movieListFormatting[index].director,
        status: this.movieListFormatting[index].status.toString(),
        poster: this.movieListFormatting[index].poster,
        actors: this.movieListFormatting[index].actors.reduce((x, y) => {
          return x + ',' + y + ','
        }),
        tags: this.movieListFormatting[index].tags.reduce((x, y) => {
          return x + ',' + y + ','
        })
      }
      console.log(this.currentMovie)
    },

    updateMovieInfo() {
      this.movieInfoModal = false
    }
  }
}
</script>
