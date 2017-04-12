$(function(){
	$('#signUpName').keydown(function(event){
		let target = $(event.target);
		if(target.val().length > 10){
			console.log('用户名长度不能超过10个字符');
		}
	})
});