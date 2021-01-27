<template>
  <div>
    <div class="app-container" v-if="enterprisecodevisible===0" >
        <el-row class="app-query">
          <el-date-picker
               v-model="value1"
               type="daterange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
             </el-date-picker>
             <el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
            label="用户微信Id"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.openId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            align="left"
            label="在线总次数"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
            <el-table-column
                  :show-overflow-tooltip="true"
                  align="left"
                  label="在线总时长(分钟)"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.sum }}</span>
                  </template>
                </el-table-column>
            <el-table-column  align='center' label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" type="success" @click="onlineHistory(scope.$index, scope.row)">详细记录</el-button>
                      <el-button size="mini" type="success" @click="userDeviceHistory(scope.$index, scope.row)">关注设备</el-button>
                    </template>
                  </el-table-column>
        </el-table>

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
      </div>
     <div class="app-container" v-if="enterprisecodevisible===1" >
           <el-row style="margin-left: 10px;margin-top: 10px" class="app-query">

               <el-col :span="2">
             <el-button icon="el-icon-back" type="warning" @click="handleCancel"  >取消</el-button>
               </el-col>
             </el-row>
         <el-table
            :data="
              OnlineHistoryDetailList.slice((currentPage1 - 1) * pageSize1, currentPage1 * pageSize1)
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
              label="用户微信Id"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.openId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="left"
              label="上线时间"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.beginDatetime }}</span>
              </template>
            </el-table-column>
              <el-table-column
                    :show-overflow-tooltip="true"
                    align="left"
                    label="下线时间"
                  >
                <template slot-scope="scope">
                  <span>{{ scope.row.endDatetime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  :show-overflow-tooltip="true"
                  align="left"
                  label="在线时间(分钟)"
                >
              <template slot-scope="scope">
                <span>{{ scope.row.minutes }}</span>
              </template>
            </el-table-column>
                <el-table-column  align='center' label="操作">

                  </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[5]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="OnlineHistoryDetailList.length"
            ></el-pagination>
          </div>
        </div>
     <div class="app-container" v-if="enterprisecodevisible===2" >
        <el-row style="margin-left: 10px;margin-top: 10px" class="app-query">

            <el-col :span="2">
          <el-button icon="el-icon-back" type="warning" @click="handleCance2"  >取消</el-button>
            </el-col>
          </el-row>
      <el-table
         :data="
           userDeviceHistorylList.slice((currentPage1 - 1) * pageSize1, currentPage1 * pageSize1)
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
           label="用户微信Id"
         >
           <template slot-scope="scope">
             <span>{{ scope.row.openId }}</span>
           </template>
         </el-table-column>
         <el-table-column
           :show-overflow-tooltip="true"
           align="left"
           label="设备编号"
         >
           <template slot-scope="scope">
             <span>{{ scope.row.deviceNo }}</span>
           </template>
         </el-table-column>
           <el-table-column
                 :show-overflow-tooltip="true"
                 align="left"
                 label="添加时间"
               >
             <template slot-scope="scope">
               <span>{{ scope.row.bindTime }}</span>
             </template>
           </el-table-column>
        <el-table-column  align='center' label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" type="success" @click="userDeviceDeatail(scope.$index, scope.row)">详细记录</el-button>
                    </template>
         </el-table-column>
       </el-table>

       <div class="pagination-container">
         <el-pagination
           background
           @size-change="handleSizeChange1"
           @current-change="handleCurrentChange1"
           :current-page="currentPage1"
           :page-sizes="[5]"
           layout="total, sizes, prev, pager, next, jumper"
           :total="userDeviceHistorylList.length"
         ></el-pagination>
       </div>
     </div>
     <div class="app-container" v-if="enterprisecodevisible===3" >
             <el-row style="margin-left: 10px;margin-top: 10px" class="app-query">

                 <el-col :span="2">
               <el-button icon="el-icon-back" type="warning" @click="handleCance3"  >取消</el-button>
                 </el-col>
               </el-row>
           <el-table
              :data="
                userDeviceDeatailList.slice((currentPage1 - 1) * pageSize1, currentPage1 * pageSize1)
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
                label="用户微信Id"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.openId }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                align="left"
                label="设备编号"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.deviceNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                            :show-overflow-tooltip="true"
                            align="left"
                            label="上线时间"
                          >
                            <template slot-scope="scope">
                              <span>{{ scope.row.beginDatetime }}</span>
                            </template>
                          </el-table-column>
                            <el-table-column
                                  :show-overflow-tooltip="true"
                                  align="left"
                                  label="下线时间"
                                >
                              <template slot-scope="scope">
                                <span>{{ scope.row.endDatetime }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                align="left"
                                label="在线时间(分钟)"
                              >
                            <template slot-scope="scope">
                              <span>{{ scope.row.minutes }}</span>
                            </template>
                          </el-table-column>

             <el-table-column  align='center' label="操作">

              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination
                background
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-sizes="[5]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userDeviceDeatailList.length"
              ></el-pagination>
            </div>
          </div>
  </div>
</template>

<script>
import { getOnlineRecordList, getOnlineHistoryDetailList,getuserDeviceHistorylList,getuserDeviceDeatailList } from "./api";

export default {
  data() {
    return {
      list: [],
      enterprisecodevisible:0,
      OnlineHistoryDetailList:[],
      userDeviceHistorylList:[],
      userDeviceDeatailList:[],
      openId:"",
      currentPage1: 1,
      pageNum1: 1,
      deviceNo:"",
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
      getOnlineRecordList().then((response) => {
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
    handleCancel(){
    this.currentPage1=1
    this.enterprisecodevisible=0;
  },
   handleCance2(){
      this.currentPage1=1
      this.enterprisecodevisible=0;
    },
     handleCance3(){
          this.currentPage1=1
          this.enterprisecodevisible=2;
        },
    onlineHistory(index,row){
        this.currentPage1=1
        this.enterprisecodevisible=1;
        this.openId=row.openId;
        this.getOnlineHistoryDetailList()
      },
      userDeviceHistory(index,row){
                  this.currentPage1=1
                  this.enterprisecodevisible=2;
                  this.openId=row.openId;
                  this.getuserDeviceHistorylList()
                },
        userDeviceDeatail(index,row){
                this.currentPage1=1
                this.enterprisecodevisible=3;
                this.openId=row.openId;
                 this.deviceNo=row.deviceNo;
                this.getuserDeviceDeatailList()
              },
      getOnlineHistoryDetailList() {
          this.listLoading = true;
          getOnlineHistoryDetailList(this.openId).then(response => {
            if(response.data.code==0){
              const data=response.data.data;
              this.OnlineHistoryDetailList=data;
              this.listLoading = false
            }else{
              this.$message.error(response.data.msg)
              return
            }
        })
      },
      getuserDeviceHistorylList() {
        this.listLoading = true;
        getuserDeviceHistorylList(this.openId).then(response => {
          if(response.data.code==0){
            const data=response.data.data;
            this.userDeviceHistorylList=data;
            this.listLoading = false
          }else{
            this.$message.error(response.data.msg)
            return
          }
      })
    },
    getuserDeviceDeatailList() {
            this.listLoading = true;
            getuserDeviceDeatailList(this.deviceNo,this.openId).then(response => {
              if(response.data.code==0){
                const data=response.data.data;
                this.userDeviceDeatailList=data;
                this.listLoading = false
              }else{
                this.$message.error(response.data.msg)
                return
              }
          })
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
