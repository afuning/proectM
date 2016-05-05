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
;var locals_for_with = (locals || {});(function (isadmin, undefined, users) {
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
}
buf.push("</td></tr>");
    }

  }
}).call(this);

}
else
{
buf.push("<tr><td colspan=\"7\" style=\"text-align: center\">无记录</td></tr>");
}}.call(this,"isadmin" in locals_for_with?locals_for_with.isadmin:typeof isadmin!=="undefined"?isadmin:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return buf.join("");
}