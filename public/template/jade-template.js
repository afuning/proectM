function topUser_template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (depart, isLogin, realname, role) {
buf.push("<div id=\"user\">");
if(isLogin==1)
buf.push("<div class=\"left\"><div class=\"account\"><a href=\"#\" class=\"tag group\">" + (jade.escape(null == (jade_interp = depart) ? "" : jade_interp)) + "</a><a href=\"#\" class=\"tag job\">" + (jade.escape(null == (jade_interp = role) ? "" : jade_interp)) + "</a><br/><a href=\"#\" class=\"name\">" + (jade.escape(null == (jade_interp = realname) ? "" : jade_interp)) + "</a><a href=\"#\" class=\"head\"><i class=\"iconfont\">&#xe630</i></a></div><div class=\"account\"><a href=\"#\"><i class=\"iconfont\">&#xe62f;</i></a></div><div class=\"account\"><a href=\"javascript:void(0);\" class=\"J-logout logout\">退出</a></div></div>");
else if(isLogin==0)
buf.push("<div class=\"left\"></div><div class=\"account un_log\"><p>还未注册自己公司账号？<a href=\"reg?step=0\">申请注册</a></p></div></div>");}.call(this,"depart" in locals_for_with?locals_for_with.depart:typeof depart!=="undefined"?depart:undefined,"isLogin" in locals_for_with?locals_for_with.isLogin:typeof isLogin!=="undefined"?isLogin:undefined,"realname" in locals_for_with?locals_for_with.realname:typeof realname!=="undefined"?realname:undefined,"role" in locals_for_with?locals_for_with.role:typeof role!=="undefined"?role:undefined));;return buf.join("");
}