<template>
  <div class="backTop">
    <el-row>
      <el-col
        :span="3"
        :offset="11"
      >
        <el-scrollbar :bottom="100">
          <div
            style="{
              height: 100%;
              width: 100%;
              background-color: #f2f5f6;
              box-shadow: 0 0 6px rgba(0,0,0, .12);
              box-sizing: boder-box;
              border-radius: 50%;
              border: 1px solid #f00;
              text-align: center;
              line-height: 40px;
              color: #1989fa;
              background: #f2f5f6;
            }"
          >
            <i class="el-icon-arrow-up" />
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.backTop {
  /* position: fixed; */
  /* right: .5rem; */
  /* bottom: 2rem; */
  /* width: 5rem; */
  /* height: 5rem; */
  background: #f00;
}
</style>
