//用户模块
define(['./services','underscore'],function(services){
	services.service('userService',['$http','$cookieStore',function($http,$cookieStore){
		var urlPrefix = '';
		var urlDict = {
			mainreg:'/user/main_reg',
			childreg:'/user/childReg',
			getbackpwd:'/user/getBackPassword',
			modifypwd:'/user/modifyPassword',
			login : '/user_login/login',
			captcha : '/sms/register',
			captchaVerify : '/sms/register/verify',
			mainVerify : '/users/main_mobile/verify',
			childVerify : '/users/child_mobile/verify',
		};
		var methodDict = {
			get:'GET',
			post:'POST',
			put:'PUT',
			delete:'DELETE'
		};
		//主账户注册 http://192.168.1.241:8088
		this.mainReg = function(mobile,captcha,password){
			return $http({
				url : 'http://192.168.1.241:8088' + urlDict.mainreg,
				method : methodDict.post,
				data : {
					'mobile' : mobile,
					'captcha' : captcha,
					'password' : password
				}
			});
		};
		//用户账户注册 添加子账号
		this.childReg = function(mobile,name,password,role_id,status,user_group_id){
			return $http({
				url : 'http://192.168.1.241:8088' + urlDict.childreg,
				method : methodDict.get,
				params : {
					'access_token':this.token.get,
					'mobile' : mobile,
					'name' : name,
					'password' : password,
					'role_id' : role_id, //角色ID
					'status' : status, //状态
					'user_group_id' : user_group_id  //组织架构ID
				}
			});
		};
		//找回密码
		this.getBackPwd = function(mobile,captcha,password){
			return $http({
				url : 'http://192.168.1.241:8088' + urlDict.getbackpwd,
				method : methodDict.put,
				params : {
					'mobile' : mobile,
					'captcha' : captcha,
					'password' : password
				}
			});
		};
		//修改密码
		this.modiifypPwd = function(uuid,mobile,password){
			return $http({
				url : 'http://192.168.1.241:8088' + urlDict.modifypwd,
				method : methodDict.put,
				params : {
					'access_token' : this.token.get,
					'uuid' : uuid, //用户ID
					'mobile' : mobile,
					'password' : password
				}
			});
		};
		//登录 http://192.168.1.240:9001
		this.login = function(username,password){
			return $http({
				url : 'http://192.168.1.240:9001' + urlDict.login,
				method : methodDict.post,
				data : {
					'grant_type':'password',
					'client_id' : 'f3d259ddd3ed8ff3843839b',
					'client_secret' : '4c7f6f8fa93d59c45502c0ae8c4a95b',
					'username' : username,
					'password' : password
				}
			});
		};

		//获取短信验证码  http://192.168.1.240:9000/sms/register
		this.captcha = function(mobile){
			return $http({
				url : 'http://192.168.1.240:9000' + urlDict.captcha,
				method : methodDict.post,
				data : {
					'mobile':mobile
				}
			});
		};

		//验证验证码是否正确  //不用
		this.captchaVerify = function(mobile,captcha){
			return $http({
				url : 'http://192.168.1.240:9000' + urlDict.captchaVerify,
				method : methodDict.get,
				params : {
					'mobile' : mobile,
					'captcha' : captcha
				}
			})
		};

		//192.168.1.241:8088
		//验证主账号手机号是否存在
		this.mainVerify = function(moblie){ 
			return $http({
				url : urlPrefix + urlDict.mainVerify,
				method : methodDict.get,
				params : {
					'mobile' : mobile,
				}
			})
		};

		//验证子账号手机号是否存在
		this.childVerify = function(moblie){
			return $http({
				url : urlPrefix + urlDict.mainVerify,
				method : methodDict.get,
				params : {
					'mobile' : mobile,
					'access_token' : this.token.get
				}
			})
		};

		//token
		this.token = {
			get: function(){
				return $cookieStore.get('token');
			},
			set : function(){
				$cookieStore.put('token',token);
			}
		};

	}]);
});