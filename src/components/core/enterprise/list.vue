<template>
  <div class="app-container">
    <el-row class="app-query">
      <!--<el-input v-model="listQuery.enterpriseName" placeholder="企业名称"  style="width: 150px;"></el-input>-->
      <!--<el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>-->
      <el-col :span="2">
        <el-button @click="handleCreate" type="success" icon="el-icon-plus"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <el-table
      :data="
        list.slice((currentPage1 - 1) * pageSize1, currentPage1 * pageSize1)
      "
      v-loading="loading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 120%"
      @row-contextmenu="openTableMenu"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        align="left"
        label="企业名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.enterpriseName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="left"
        label="是否可用"
      >
        <template slot-scope="scope">
          <span>{{ statusArray[scope.row.status] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <menu-context ref="menuContext">
      <menu-context-item @click="handleUpdate">编辑</menu-context-item>
      <!--<context-menu-item @click="handleDelete">删除</context-menu-item>-->
    </menu-context>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="currentPage1"
        :page-sizes="[5]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      ></el-pagination>
    </div>
    <div class="el-dialog-enterprise">
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        width="30%"
      >
        <el-form
          :rules="rules"
          ref="enterpriseForm"
          :model="enterpriseFormData"
          label-position="right"
          label-width="80px"
          style="width: 90%; margin-left: 15px"
        >
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input v-model="enterpriseFormData.enterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="是否可用">
            <el-select
              clearable
              class="filter-item"
              v-model="enterpriseFormData.status"
              style="width: 100%"
            >
              <el-option
                v-for="(k, v) in statusArray"
                :key="k"
                :label="v"
                :value="k"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editData">确认</el-button>
          <el-button
            icon="el-icon-back"
            type="warning"
            @click="dialogFormVisible = false"
            >取消</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEnterpriseList, editEnterprise, createEnterprise } from "./api";

export default {
  data() {
    return {
      list: [],
      currentPage1: 1,
      pageNum1: 1,
      pageSize1: 5,
      statusArray: {
        0: "否",
        1: "是",
      },
      textMap: {
        update: "编辑",
        create: "新增",
      },
      enterpriseCustomerId: "",
      dialogStatus: "",
      dialogFormVisible: false,
      enterpriseFormData: {
        id: "",
        enterpriseName: "",
        enterpriseCode: "",
        status: 1,
      },
      rules: {
        enterpriseId: [
          { required: true, message: "企业id不能为空", trigger: "blur" },
        ],
        enterpriseCode: [
          { required: true, message: "编号不能为空", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getEnterpriseList().then((response) => {
        if (response.data.code == 0) {
          const data = response.data.data;
          this.list = data;
          this.loading = false;
        } else {
          this.$message.error(response.data.msg);
          return;
        }
      });
    },
    cancel() {
      this.dialogCodeFormVisible = false;
      this.enterpriseFormData.enterpriseName = "";
    },
    openTableMenu(row, event) {
      this.$refs.menuContext.openTableMenu(row, event);
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },

    resetTemp() {
      this.enterpriseFormData = {
        id: "",
        enterpriseName: "",
        status: 1,
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["enterpriseForm"].clearValidate();
      });
    },

    handleUpdate(row) {
      this.enterpriseFormData = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["enterpriseForm"].clearValidate();
      });
    },
    editData() {
      this.$refs.enterpriseForm.validate((valid) => {
        if (valid) {
          if (this.dialogStatus == "create") {
            createEnterprise({
              enterpriseName: this.enterpriseFormData.enterpriseName,
              status: this.enterpriseFormData.status,
            }).then((data) => {
              if (data.data.code == 0) {
                this.dialogFormVisible = false;
                this.$message({
                  message: "成功",
                  type: "success",
                });
                this.getList();
              } else {
                this.$message.error(data.data.msg);
                return;
              }
            });
          } else {
            editEnterprise({
              id: this.enterpriseFormData.id,
              enterpriseName: this.enterpriseFormData.enterpriseName,
              status: this.enterpriseFormData.status,
            }).then((data) => {
              if (data.data.code == 0) {
                this.dialogFormVisible = false;
                this.$message({
                  message: "成功",
                  type: "success",
                });
                this.getList();
              } else {
                this.$message.error(data.data.msg);
                return;
              }
            });
          }
        } else {
          return false;
        }
      });
    },

    handleSizeChange1: function (pageSize) {
      this.pageSize1 = pageSize;
      this.handleCurrentChange1(this.currentPage);
    },
    handleCurrentChange1: function (currentPage) {
      //页码切换
      this.currentPage1 = currentPage;
    },
  },
};
</script>
