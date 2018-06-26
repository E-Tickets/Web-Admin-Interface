<template>
  <div>
    <Row>
      <Col span="8">
        <div class="movie-poster">
          <img :src="currentMovie.poster" height="240" width="150" alt="movie-poster" v-if="currentMovie.poster" />
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
              <Input v-model="currentMovie.title" @on-change="movieInfoChange" placeholder="Movie title"></Input>
            </FormItem>
            <FormItem label="导演">
              <Input v-model="currentMovie.director" @on-change="movieInfoChange" placeholder="Director"></Input>
            </FormItem>
            <FormItem label="状态">
              <Select v-model="currentMovie.status" @on-change="movieInfoChange">
                <Option value="0">即将上映</Option>
                <Option value="1">正在热映</Option>
                <Option value="2">已经下映</Option>
              </Select>
            </FormItem>
            <FormItem label="演员">
              <Input v-model="currentMovie.actors" @on-change="movieInfoChange" placeholder="Actors"></Input>
            </FormItem>
            <FormItem label="标签">
              <Input v-model="currentMovie.tags" @on-change="movieInfoChange" placeholder="Tags"></Input>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
  </div>
</template>

<style scoped>
.movie-poster {
  text-align: center;
  margin-bottom: 5px;
  height: 240px;
  width: 240px;
}

.poster-upload {
  text-align: center;
}
</style>

<script>
export default {
  props: ['currentMovie'],

  methods: {
    movieInfoChange() {
      this.$emit('movieChanged', this.currentMovie)
    }
  }
}
</script>
