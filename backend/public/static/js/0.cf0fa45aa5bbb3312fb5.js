webpackJsonp([0],{D2Y9:function(e,s){},do2d:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=t("mvHQ"),a=t.n(i);function r(e){return fetch("http://127.0.0.1:3000/process/analysis",{method:"post",body:a()(e),headers:{"Content-Type":"application/json"}}).then(function(e){return e.text()})}var o={data:function(){return{isDisabled:!1,isDesc:"是",isExam:"是",metrics:[["糖化血红蛋白","thxhdb"],["γ-谷氨酰转肽酶","gaxztm"],["乳酸脱氢酶","rstqm"],["低密度脂蛋白","dmdzdb"],["前白蛋白","qbdb"],["尿素","ns1"],["尿酸","ns2"],["总胆固醇","zdgc"],["总胆汁酸","zdzs"],["总胆红素","zdhs"],["总蛋白","zdb"],["球蛋白","qdb"],["甘油三脂","gysz"],["白球比","bqb"],["白蛋白","bdb"],["直接胆红素","zjdhs"],["碱性磷酸酶","jxlsm"],["肌酐","jg"],["肌酸激酶","jsjm"],["胆碱脂酶","djzm"],["脂蛋白(a)","zdba"],["葡萄糖","ptt"],["载脂蛋白A1","zzdba1"],["载脂蛋白B","zzdbb"],["间接胆红素","jjdhs"],["高密度脂蛋白","gmdzdb"]],form:{name:"",sex:"男",age:"",desc:"",exam:{thxhdb:"",gaxztm:"",rstqm:"",dmdzdb:"",qbdb:"",ns1:"",ns2:"",zdgc:"",zdzs:"",zdhs:"",zdb:"",qdb:"",gysz:"",bqb:"",bdb:"",zjdhs:"",jxlsm:"",jg:"",jsjm:"",djzm:"",zdba:"",ptt:"",zzdba1:"",zzdbb:"",jjdhs:"",gmdzdb:""}}}},computed:{isDescShow:function(){return"是"==this.isDesc},isExamShow:function(){return"是"==this.isExam},isDescDisable:function(){return"否"==this.isExam},isExamDisable:function(){return"否"==this.isDesc}},mounted:function(){this.$notify.info({title:"操作指南",message:"您可以同时填入症状描述和体检信息，也可以仅填入其中一项数据。点击下方的提交按钮，后台将为您完成疾病的判别。",duration:8e3})},methods:{onSubmit:function(){if(""!=this.form.name)if("是"!=this.isDesc||""!=this.form.desc){this.isDisabled=!0;var e={};for(var s in this.form)e[s]=this.form[s];e.isDesc=this.isDesc,e.isExam=this.isExam;var t=this;"是"==this.isExam?function(e){return fetch("http://127.0.0.1:3000/process/saveExam",{method:"post",body:a()(e),headers:{"Content-Type":"application/json"}}).then(function(e){return e.text()})}(e).then(function(s){r(e).then(function(e){t.$alert(e,"判定结果",{dangerouslyUseHTMLString:!0}),t.isDisabled=!1})}):r(e).then(function(e){t.$alert(e,"判定结果",{dangerouslyUseHTMLString:!0}),t.isDisabled=!1})}else this.$message({message:"请输入症状描述！若不想输入症状可以点击按钮选“否”。",type:"warning",duration:5e3});else this.$message({message:"请输入姓名！",type:"warning"})},resetForm:function(e){this.form.desc="",this.form.age=0,this.form.name="",this.form.sex="男",this.isDesc="是",this.isExam="是",this.$refs[e].resetFields()}}},l={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"predict-wrap"},[t("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":"125px"}},[t("el-row",[t("el-form-item",{attrs:{label:"姓名",rules:[{required:!0}]}},[t("el-input",{attrs:{disabled:e.isDisabled},model:{value:e.form.name,callback:function(s){e.$set(e.form,"name",s)},expression:"form.name"}})],1)],1),e._v(" "),t("el-row",[t("el-form-item",{attrs:{label:"性别",rules:[{required:!0}]}},[t("el-radio-group",{attrs:{disabled:e.isDisabled},model:{value:e.form.sex,callback:function(s){e.$set(e.form,"sex",s)},expression:"form.sex"}},[t("el-radio-button",{attrs:{label:"男",disabled:e.isDisabled}}),e._v(" "),t("el-radio-button",{attrs:{label:"女",disabled:e.isDisabled}})],1)],1)],1),e._v(" "),t("el-row",[t("el-form-item",{attrs:{label:"年龄",rules:[{required:!0}]}},[t("el-input-number",{attrs:{step:1,max:110,disabled:e.isDisabled},model:{value:e.form.age,callback:function(s){e.$set(e.form,"age",s)},expression:"form.age"}})],1)],1),e._v(" "),t("el-row",[t("el-form-item",{attrs:{label:"是否填写症状描述",prop:e.isDesc}},[t("el-radio-group",{attrs:{disabled:e.isDescDisable},model:{value:e.isDesc,callback:function(s){e.isDesc=s},expression:"isDesc"}},[t("el-radio-button",{attrs:{label:"是",disabled:e.isDisabled}}),e._v(" "),t("el-radio-button",{attrs:{label:"否",disabled:e.isDisabled}})],1)],1)],1),e._v(" "),t("el-row",[t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isDescShow,expression:"isDescShow"}],attrs:{label:"症状描述",prop:e.form.desc,rules:[{required:!0}]}},[t("el-input",{staticClass:"desc",attrs:{type:"textarea",autosize:{minRows:5},placeholder:"请输入症状",disabled:e.isDisabled},model:{value:e.form.desc,callback:function(s){e.$set(e.form,"desc",s)},expression:"form.desc"}})],1)],1),e._v(" "),t("el-row",[t("el-form-item",{attrs:{label:"是否填写体检数据",prop:e.isExam}},[t("el-radio-group",{attrs:{disabled:e.isExamDisable},model:{value:e.isExam,callback:function(s){e.isExam=s},expression:"isExam"}},[t("el-radio-button",{attrs:{label:"是",disabled:e.isDisabled}}),e._v(" "),t("el-radio-button",{attrs:{label:"否",disabled:e.isDisabled}})],1)],1)],1),e._v(" "),t("el-row",e._l(e.metrics,function(s,i){return t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isExamShow,expression:"isExamShow"}],attrs:{label:s[0],prop:s[1]}},[t("div",{staticClass:"metrics"},[t("el-input-number",{attrs:{precision:2,step:.1,min:0,disabled:e.isDisabled},model:{value:e.form.exam[s[1]],callback:function(t){e.$set(e.form.exam,s[1],t)},expression:"form['exam'][item[1]]"}})],1)])}),1),e._v(" "),t("el-row",[t("el-form-item",[t("el-button",{attrs:{type:"primary",disabled:e.isDisabled},on:{click:e.onSubmit}},[e._v("开始判定")]),e._v(" "),t("el-button",{attrs:{disabled:e.isDisabled},on:{click:function(s){return e.resetForm("form")}}},[e._v("重置")])],1)],1)],1)],1)},staticRenderFns:[]};var n=t("VU/8")(o,l,!1,function(e){t("D2Y9")},null,null);s.default=n.exports},mvHQ:function(e,s,t){e.exports={default:t("qkKv"),__esModule:!0}},qkKv:function(e,s,t){var i=t("FeBl"),a=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}}});
//# sourceMappingURL=0.cf0fa45aa5bbb3312fb5.js.map