const {ADMIN_PASS: adminPass} = process.env;

exports.login = (ctx) => {
  const {password} = ctx.request.body;
  console.log(adminPass +'==='+ password);
  if(adminPass === password) {
    ctx.body = {
      success: true
    };

    ctx.session.logged = true;
  }else{
    ctx.body = {
      success: false
    };

    ctx.status = 401;
  }

}
