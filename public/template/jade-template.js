function bugCount_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<tr><tr><td><span>今日</span></td><td><span>10</span></td><td><span>100</span></td></tr><tr><td><span>当前月份</span></td><td><span>10</span></td><td><span>100</span></td></tr><tr><td colspan=\"3\" style=\"text-align: right\"><span>未解决bug总数: 200</span></td></tr></tr>");;return buf.join("");
}
function bugList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (moment, tasks, undefined) {
buf.push("<tr><th colspan=\"8\" style=\"text-align: left\" class=\"table_action\"><a href=\"javascript:void(0)\" class=\"J-addTask btn-success\"><i class=\"iconfont\">&#xe639</i>新增BUG</a></th></tr>");
if ((tasks.length>0))
{
// iterate tasks
;(function(){
  var $$obj = tasks;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.project_id.name) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.from_id?item.from_id[0].realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.to_id?item.to_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td>");
if ((item.rank == 1))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-red active\">立即解决</span>");
}
else if ((item.rank == 2))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-orange active\">严重</span>");
}
else if ((item.rank == 3))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-yellow active\">中等</span>");
}
else if ((item.rank == 4))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-green active\">轻微</span>");
}
buf.push("</td><td>");
if ((item.status == 0))
{
buf.push("<span>待解决</span>");
}
else if ((item.status == 1))
{
buf.push("<span>已解决</span>");
}
buf.push("</td><td><a" + (jade.attr("href", './bug/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.project_id.name) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.from_id?item.from_id[0].realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.to_id?item.to_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td>");
if ((item.rank == 1))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-red active\">立即解决</span>");
}
else if ((item.rank == 2))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-orange active\">严重</span>");
}
else if ((item.rank == 3))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-yellow active\">中等</span>");
}
else if ((item.rank == 4))
{
buf.push("<span href=\"javascript: void(0);\" class=\"rank_label rank_label-green active\">轻微</span>");
}
buf.push("</td><td>");
if ((item.status == 0))
{
buf.push("<span>待解决</span>");
}
else if ((item.status == 1))
{
buf.push("<span>已解决</span>");
}
buf.push("</td><td><a" + (jade.attr("href", './bug/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"7\" style=\"text-align: center\">当前无BUG记录</td></tr>");
}}.call(this,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"tasks" in locals_for_with?locals_for_with.tasks:typeof tasks!=="undefined"?tasks:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
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

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><!--i.iconfont(class='delete') &#xe600--></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><!--i.iconfont(class='delete') &#xe600--></div>");
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
function fileList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (files, undefined) {
if ((files.length>0))
{
// iterate files
;(function(){
  var $$obj = files;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr><td><span>" + (jade.escape(null == (jade_interp = item.title?item.title:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未知') ? "" : jade_interp)) + "</span></td><td>");
// iterate item.file
;(function(){
  var $$obj = item.file;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var file = $$obj[$index];

buf.push("<span>" + (jade.escape((jade_interp = file.name) == null ? '' : jade_interp)) + "&nbsp;&nbsp;(" + (jade.escape((jade_interp = file.type) == null ? '' : jade_interp)) + "&nbsp;" + (jade.escape((jade_interp = file.size) == null ? '' : jade_interp)) + ")</span><a" + (jade.attr("href", file.url, true, false)) + " target=\"_blank\">&nbsp;&nbsp;&nbsp;&nbsp;下载</a><br/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var file = $$obj[$index];

buf.push("<span>" + (jade.escape((jade_interp = file.name) == null ? '' : jade_interp)) + "&nbsp;&nbsp;(" + (jade.escape((jade_interp = file.type) == null ? '' : jade_interp)) + "&nbsp;" + (jade.escape((jade_interp = file.size) == null ? '' : jade_interp)) + ")</span><a" + (jade.attr("href", file.url, true, false)) + " target=\"_blank\">&nbsp;&nbsp;&nbsp;&nbsp;下载</a><br/>");
    }

  }
}).call(this);

buf.push("</td><!--td\n   a.delete(href= 'javascript:void(0);' _id= item._id) 删除--></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr><td><span>" + (jade.escape(null == (jade_interp = item.title?item.title:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未知') ? "" : jade_interp)) + "</span></td><td>");
// iterate item.file
;(function(){
  var $$obj = item.file;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var file = $$obj[$index];

buf.push("<span>" + (jade.escape((jade_interp = file.name) == null ? '' : jade_interp)) + "&nbsp;&nbsp;(" + (jade.escape((jade_interp = file.type) == null ? '' : jade_interp)) + "&nbsp;" + (jade.escape((jade_interp = file.size) == null ? '' : jade_interp)) + ")</span><a" + (jade.attr("href", file.url, true, false)) + " target=\"_blank\">&nbsp;&nbsp;&nbsp;&nbsp;下载</a><br/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var file = $$obj[$index];

buf.push("<span>" + (jade.escape((jade_interp = file.name) == null ? '' : jade_interp)) + "&nbsp;&nbsp;(" + (jade.escape((jade_interp = file.type) == null ? '' : jade_interp)) + "&nbsp;" + (jade.escape((jade_interp = file.size) == null ? '' : jade_interp)) + ")</span><a" + (jade.attr("href", file.url, true, false)) + " target=\"_blank\">&nbsp;&nbsp;&nbsp;&nbsp;下载</a><br/>");
    }

  }
}).call(this);

buf.push("</td><!--td\n   a.delete(href= 'javascript:void(0);' _id= item._id) 删除--></tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"3\" style=\"text-align: center\">无文件记录</td></tr>");
}}.call(this,"files" in locals_for_with?locals_for_with.files:typeof files!=="undefined"?files:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function msgLetter_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_id, letters, moment, undefined) {
if ((letters.length>0))
{
// iterate letters
;(function(){
  var $$obj = letters;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"message_inner\">");
if ((item.from_id._id == _id))
{
buf.push("<a" + (jade.attr("href", '/manage/message/history?_id='+item.to_id._id, true, false)) + ">");
if ((!item.isRead && _id != item.dialogue[item.dialogue.length-1].from._id))
{
buf.push("<div class=\"red\"></div>");
}
buf.push("<img" + (jade.attr("src", item.to_id.head_url, true, false)) + "/><div class=\"detail\"><p>" + (jade.escape(null == (jade_interp = item.to_id.realname) ? "" : jade_interp)) + "<span class=\"right\">" + (jade.escape(null == (jade_interp = moment(item.dialogue[item.dialogue.length-1].time).format('YYYY-MM-DD HH:mm:ss')) ? "" : jade_interp)) + "</span></p><p>" + (jade.escape(null == (jade_interp = item.dialogue[item.dialogue.length-1].content) ? "" : jade_interp)) + "</p></div></a>");
}
else
{
buf.push("<a" + (jade.attr("href", '/manage/message/history?_id='+item.from_id._id, true, false)) + ">");
if ((!item.isRead && _id != item.dialogue[item.dialogue.length-1].from._id))
{
buf.push("<div class=\"red\"></div>");
}
buf.push("<img" + (jade.attr("src", item.from_id.head_url, true, false)) + "/><div class=\"detail\"><p>" + (jade.escape(null == (jade_interp = item.from_id.realname) ? "" : jade_interp)) + "<span class=\"right\">" + (jade.escape(null == (jade_interp = moment(item.dialogue[item.dialogue.length-1].time).format('YYYY-MM-DD HH:mm:ss')) ? "" : jade_interp)) + "</span></p><p>" + (jade.escape(null == (jade_interp = item.dialogue[item.dialogue.length-1].content) ? "" : jade_interp)) + "</p></div></a>");
}
buf.push("<div class=\"action_inner\"><a href=\"javascript:void(0);\" title=\"删除\"" + (jade.attr("_id", item._id, true, false)) + " class=\"J-delete\"><i class=\"iconfont\">&#xe63c</i></a></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"message_inner\">");
if ((item.from_id._id == _id))
{
buf.push("<a" + (jade.attr("href", '/manage/message/history?_id='+item.to_id._id, true, false)) + ">");
if ((!item.isRead && _id != item.dialogue[item.dialogue.length-1].from._id))
{
buf.push("<div class=\"red\"></div>");
}
buf.push("<img" + (jade.attr("src", item.to_id.head_url, true, false)) + "/><div class=\"detail\"><p>" + (jade.escape(null == (jade_interp = item.to_id.realname) ? "" : jade_interp)) + "<span class=\"right\">" + (jade.escape(null == (jade_interp = moment(item.dialogue[item.dialogue.length-1].time).format('YYYY-MM-DD HH:mm:ss')) ? "" : jade_interp)) + "</span></p><p>" + (jade.escape(null == (jade_interp = item.dialogue[item.dialogue.length-1].content) ? "" : jade_interp)) + "</p></div></a>");
}
else
{
buf.push("<a" + (jade.attr("href", '/manage/message/history?_id='+item.from_id._id, true, false)) + ">");
if ((!item.isRead && _id != item.dialogue[item.dialogue.length-1].from._id))
{
buf.push("<div class=\"red\"></div>");
}
buf.push("<img" + (jade.attr("src", item.from_id.head_url, true, false)) + "/><div class=\"detail\"><p>" + (jade.escape(null == (jade_interp = item.from_id.realname) ? "" : jade_interp)) + "<span class=\"right\">" + (jade.escape(null == (jade_interp = moment(item.dialogue[item.dialogue.length-1].time).format('YYYY-MM-DD HH:mm:ss')) ? "" : jade_interp)) + "</span></p><p>" + (jade.escape(null == (jade_interp = item.dialogue[item.dialogue.length-1].content) ? "" : jade_interp)) + "</p></div></a>");
}
buf.push("<div class=\"action_inner\"><a href=\"javascript:void(0);\" title=\"删除\"" + (jade.attr("_id", item._id, true, false)) + " class=\"J-delete\"><i class=\"iconfont\">&#xe63c</i></a></div></div>");
    }

  }
}).call(this);

}
else
{
buf.push("<p style=\"padding: 20px;font-size: 14px; text-align: center\">暂无私信</p>");
}}.call(this,"_id" in locals_for_with?locals_for_with._id:typeof _id!=="undefined"?_id:undefined,"letters" in locals_for_with?locals_for_with.letters:typeof letters!=="undefined"?letters:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function msgSend_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (isme, moment, msg) {
if ((isme))
{
buf.push("<div class=\"content_inner right\"><p class=\"time\">" + (jade.escape(null == (jade_interp = moment(msg.time).format('YYYY-MM-DD HH:mm:ss')) ? "" : jade_interp)) + "</p><div class=\"user\"><div class=\"img\"><img" + (jade.attr("src", msg.from.head_url, true, false)) + "/></div><div class=\"text\"><div class=\"arrow\"></div><span>" + (jade.escape(null == (jade_interp = msg.content) ? "" : jade_interp)) + "</span></div></div></div>");
}
else
{
buf.push("<div class=\"content_inner left\"><p class=\"time\">" + (jade.escape(null == (jade_interp = moment(msg.time).format('YYYY-MM-DD HH:mm:ss')) ? "" : jade_interp)) + "</p><div class=\"user\"><div class=\"img\"><img" + (jade.attr("src", msg.to.head_url, true, false)) + "/></div><div class=\"text\"><div class=\"arrow\"></div><span>" + (jade.escape(null == (jade_interp = msg.content) ? "" : jade_interp)) + "</span></div></div></div>");
}}.call(this,"isme" in locals_for_with?locals_for_with.isme:typeof isme!=="undefined"?isme:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"msg" in locals_for_with?locals_for_with.msg:typeof msg!=="undefined"?msg:undefined));;return buf.join("");
}
function msgUser_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined, users) {
if ((users.length>0))
{
buf.push("<div class=\"user_list\">");
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/manage/message/history?_id='+item._id, true, false)) + "><img" + (jade.attr("src", item.head_url, true, false)) + "/><p>" + (jade.escape(null == (jade_interp = item.realname) ? "" : jade_interp)) + "</p></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/manage/message/history?_id='+item._id, true, false)) + "><img" + (jade.attr("src", item.head_url, true, false)) + "/><p>" + (jade.escape(null == (jade_interp = item.realname) ? "" : jade_interp)) + "</p></a>");
    }

  }
}).call(this);

buf.push("</div>");
}
else
{
buf.push("<div class=\"user_list\"><span style=\"padding-left: 15px;font-size: 12px\">该部门下无职员</span></div>");
}}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return buf.join("");
}
function noticeList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (isadmin, moment, notices, undefined) {
if ((notices.length>0))
{
// iterate notices
;(function(){
  var $$obj = notices;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><a" + (jade.attr("href", '/share/notice/detail?_id=' + (item._id) + '', true, false)) + " target=\"_blank\">" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</a></td><td style=\"width: 140px\"><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td style=\"width: 140px\"><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未知') ? "" : jade_interp)) + "</span></td>");
if ((isadmin == 1))
{
buf.push("<td style=\"width: 80px\"><a href=\"javascript:void(0);\" class=\"delete_action\">删除</a></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><a" + (jade.attr("href", '/share/notice/detail?_id=' + (item._id) + '', true, false)) + " target=\"_blank\">" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</a></td><td style=\"width: 140px\"><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td style=\"width: 140px\"><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未知') ? "" : jade_interp)) + "</span></td>");
if ((isadmin == 1))
{
buf.push("<td style=\"width: 80px\"><a href=\"javascript:void(0);\" class=\"delete_action\">删除</a></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"3\" style=\"text-align: center\">无记录</td></tr>");
}}.call(this,"isadmin" in locals_for_with?locals_for_with.isadmin:typeof isadmin!=="undefined"?isadmin:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"notices" in locals_for_with?locals_for_with.notices:typeof notices!=="undefined"?notices:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
function projectList_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (isadmin, moment, projects, undefined) {
if ((isadmin==1))
{
buf.push("<tr><th colspan=\"4\" style=\"text-align: left\" class=\"table_action\"><a href=\"javascript:void(0)\" class=\"J-addProject btn-success\"><i class=\"iconfont\">&#xe639</i>新增项目</a></th></tr>");
}
if ((projects.length>0))
{
// iterate projects
;(function(){
  var $$obj = projects;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("LLL")) ? "" : jade_interp)) + "</span></td><td><a" + (jade.attr("href", './project/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.creater_id?item.creater_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("LLL")) ? "" : jade_interp)) + "</span></td><td><a" + (jade.attr("href", './project/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
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

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><!--i.iconfont(class='delete') &#xe600--></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"select_inner\"><a href=\"javascript:void(0);\"" + (jade.attr("_id", item._id, true, false)) + " class=\"select\">" + (jade.escape(null == (jade_interp = item.name) ? "" : jade_interp)) + "</a><!--i.iconfont(class='delete') &#xe600--></div>");
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

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.project_id.name) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.from_id?item.from_id[0].realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.to_id?item.to_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.forecastTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.endTime?moment(item.endTime).format("YYYY-MM-DD HH:mm:ss"):'待完成') ? "" : jade_interp)) + "</span></td><td><a" + (jade.attr("href", './task/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<tr" + (jade.attr("_id", item._id, true, false)) + "><td><span>" + (jade.escape(null == (jade_interp = item.name?item.name:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.project_id.name) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.from_id?item.from_id[0].realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.to_id?item.to_id.realname:'未设置') ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = moment(item.forecastTime).format("YYYY-MM-DD HH:mm:ss")) ? "" : jade_interp)) + "</span></td><td><span>" + (jade.escape(null == (jade_interp = item.endTime?moment(item.endTime).format("YYYY-MM-DD HH:mm:ss"):'待完成') ? "" : jade_interp)) + "</span></td><td><a" + (jade.attr("href", './task/detail?_id='+item._id, true, false)) + " target=\"_blank\">查看详情</a></td></tr>");
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
buf.push("<div class=\"left\"><div class=\"account\"><a href=\"/group/company\" class=\"tag group\">" + (jade.escape(null == (jade_interp = depart) ? "" : jade_interp)) + "</a><a href=\"/group/company\" class=\"tag job\">" + (jade.escape(null == (jade_interp = role) ? "" : jade_interp)) + "</a><br/><a href=\"/index\" class=\"name\">" + (jade.escape(null == (jade_interp = realname) ? "" : jade_interp)) + "</a><a href=\"/setting/user\" class=\"head\">");
if ( head_url)
{
buf.push("<img" + (jade.attr("src", head_url, true, false)) + "/>");
}
else
{
buf.push("<i class=\"iconfont\">&#xe630</i>");
}
buf.push("</a></div><div class=\"account\"><a href=\"/manage/message\"><i class=\"iconfont\">&#xe62f;</i><span class=\"red J-red\"></span></a></div><div class=\"account\"><a href=\"javascript:void(0);\" class=\"J-logout logout\">退出</a></div></div>");
}
else if ( isLogin==0)
{
buf.push("<div class=\"left\"><div class=\"account un_log\"></div><p>还未注册自己公司账号？<a href=\"reg?step=0\" style=\"color:#7cbae5\">申请注册</a></p></div>");
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