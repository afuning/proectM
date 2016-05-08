function departList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (depart, isAdmin, undefined) {
if ((isAdmin == 1))
{
// iterate depart
;(function(){
  var $$obj = depart;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><i class=\"iconfont delete\">&#xe600</i></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><i class=\"iconfont delete\">&#xe600</i></div>");
    }

  }
}).call(this);

buf.push("<div class=\"select_inner select_action\"><button class=\"addDepart btn-success\">新增部门</button></div>");
}
else
{
// iterate depart
;(function(){
  var $$obj = depart;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a></div>");
    }

  }
}).call(this);

}}.call(this,"depart" in locals_for_with?locals_for_with.depart:typeof depart!=="undefined"?depart:undefined,"isAdmin" in locals_for_with?locals_for_with.isAdmin:typeof isAdmin!=="undefined"?isAdmin:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function projectList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (isadmin, moment, projects, undefined) {
if ((isadmin==1))
{
buf.push("<tr><th colspan=\"7\" style=\"text-align: left\" class=\"table_action\"><a href=\"javascript:void(0)\" class=\"J-addProject btn-success\"><i class=\"iconfont\">&#xe639</i>新增项目</a></th></tr>");
}
if ((projects.length>0))
{
// iterate projects
;(function(){
  var $$obj = projects;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("LLL")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.total) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.total_ing) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.total_ed) ? "" : jade_interp)) + "</span></td><td><a href=\"javascript:void(0);\">查看详情</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("LLL")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.total) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.total_ing) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.total_ed) ? "" : jade_interp)) + "</span></td><td><a href=\"javascript:void(0);\">查看详情</a></td></tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"7\" style=\"text-align: center\">当前无项目记录</td></tr>");
}}.call(this,"isadmin" in locals_for_with?locals_for_with.isadmin:typeof isadmin!=="undefined"?isadmin:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"projects" in locals_for_with?locals_for_with.projects:typeof projects!=="undefined"?projects:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function roleList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (isAdmin, role, undefined) {
if ((isAdmin == 1))
{
// iterate role
;(function(){
  var $$obj = role;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><i class=\"iconfont delete\">&#xe600</i></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><i class=\"iconfont delete\">&#xe600</i></div>");
    }

  }
}).call(this);

buf.push("<div class=\"select_inner select_action\"><button class=\"back btn-line\">返回部门</button><button" + (jade.attr("depart_id", role[0].department, true, false)) + " class=\"addRole btn-success\">新增职位</button></div>");
}
else
{
// iterate role
;(function(){
  var $$obj = role;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a></div>");
    }

  }
}).call(this);

buf.push("<div class=\"select_inner select_action\"><button class=\"back btn-line\">返回部门</button></div>");
}}.call(this,"isAdmin" in locals_for_with?locals_for_with.isAdmin:typeof isAdmin!=="undefined"?isAdmin:undefined,"role" in locals_for_with?locals_for_with.role:typeof role!=="undefined"?role:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function taskList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (moment, tasks, undefined) {
buf.push("<tr><th colspan=\"8\" style=\"text-align: left\" class=\"table_action\"><a href=\"javascript:void(0)\" class=\"J-addTask btn-success\"><i class=\"iconfont\">&#xe639</i>新增任务</a></th></tr>");
if ((tasks.length>0))
{
// iterate tasks
;(function(){
  var $$obj = tasks;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.project_id.name) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.from_id?item.from_id[0].realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.to_id?item.to_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD hh:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.forecastTime).format("YYYY-MM-DD hh:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.endTime?moment(item.endTime).format("YYYY-MM-DD hh:mm:ss"):'待完成') ? "" : jade_interp)) + "</span></td><td><a" + (jade.attr("href", './task/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.project_id.name) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.from_id?item.from_id[0].realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.to_id?item.to_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD hh:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.forecastTime).format("YYYY-MM-DD hh:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.endTime?moment(item.endTime).format("YYYY-MM-DD hh:mm:ss"):'待完成') ? "" : jade_interp)) + "</span></td><td><a" + (jade.attr("href", './task/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"7\" style=\"text-align: center\">当前无任务记录</td></tr>");
}}.call(this,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"tasks" in locals_for_with?locals_for_with.tasks:typeof tasks!=="undefined"?tasks:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function topUser_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (depart, head_url, isLogin, realname, role) {
buf.push("<div id=\"user\">");
if ( isLogin==1)
{
buf.push("<div class=\"left\"><div class=\"account\"><a href=\"#\" class=\"tag group\">" + (jade.escape(null == (jade_interp = depart) ? "" : jade_interp)) + "</a><a href=\"#\" class=\"tag job\">" + (jade.escape(null == (jade_interp = role) ? "" : jade_interp)) + "</a><br/><a href=\"#\" class=\"name\">" + (jade.escape(null == (jade_interp = realname) ? "" : jade_interp)) + "</a><a href=\"#\" class=\"head\">");
if ( head_url)
{
buf.push("<img" + (jade.attr("src", head_url, true, false)) + "/>");
}
else
{
buf.push("<i class=\"iconfont\">&#xe630</i>");
}
buf.push("</a></div><div class=\"account\"><a href=\"#\"><i class=\"iconfont\">&#xe62f;</i></a></div><div class=\"account\"><a href=\"javascript:void(0);\" class=\"J-logout logout\">退出</a></div></div>");
}
else if ( isLogin==0)
{
buf.push("<div class=\"left\"><div class=\"account un_log\"></div><p>还未注册自己公司账号？<a href=\"reg?step=0\">申请注册</a></p></div>");
}
buf.push("</div>");}.call(this,"depart" in locals_for_with?locals_for_with.depart:typeof depart!=="undefined"?depart:undefined,"head_url" in locals_for_with?locals_for_with.head_url:typeof head_url!=="undefined"?head_url:undefined,"isLogin" in locals_for_with?locals_for_with.isLogin:typeof isLogin!=="undefined"?isLogin:undefined,"realname" in locals_for_with?locals_for_with.realname:typeof realname!=="undefined"?realname:undefined,"role" in locals_for_with?locals_for_with.role:typeof role!=="undefined"?role:undefined));;return buf.join("");
}
function userList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_id, isadmin, undefined, users) {
if ((users.length>0))
{
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><img width=\"40\" height=\"40\"" + (jade.attr("src", item.head_url?item.head_url: '', true, false)) + "/></td><td><span>" + (jade.escape(null == (jade_interp = item.realname?item.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.qq_num?item.qq_num:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.mobile?item.mobile:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.role?item.role.department.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.role?item.role.name:'未设置') ? "" : jade_interp)) + "</span></td><td>");
if ((isadmin == 1))
{
buf.push("<a href=\"javascript:void(0);\" class=\"delete_action\">删除</a>");
if ((item.isadmin == 0))
{
buf.push("<span>/</span><a href=\"javascript:void(0);\" class=\"change_admin\">设为管理员</a>");
}
else if ((_id != item._id))
{
buf.push("<span>/</span><a href=\"javascript:void(0);\" class=\"change_admin\">取消管理员</a>");
}
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><img width=\"40\" height=\"40\"" + (jade.attr("src", item.head_url?item.head_url: '', true, false)) + "/></td><td><span>" + (jade.escape(null == (jade_interp = item.realname?item.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.qq_num?item.qq_num:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.mobile?item.mobile:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.role?item.role.department.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.role?item.role.name:'未设置') ? "" : jade_interp)) + "</span></td><td>");
if ((isadmin == 1))
{
buf.push("<a href=\"javascript:void(0);\" class=\"delete_action\">删除</a>");
if ((item.isadmin == 0))
{
buf.push("<span>/</span><a href=\"javascript:void(0);\" class=\"change_admin\">设为管理员</a>");
}
else if ((_id != item._id))
{
buf.push("<span>/</span><a href=\"javascript:void(0);\" class=\"change_admin\">取消管理员</a>");
}
}
buf.push("</td></tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"7\" style=\"text-align: center\">无记录</td></tr>");
}}.call(this,"_id" in locals_for_with?locals_for_with._id:typeof _id!=="undefined"?_id:undefined,"isadmin" in locals_for_with?locals_for_with.isadmin:typeof isadmin!=="undefined"?isadmin:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return buf.join("");
}