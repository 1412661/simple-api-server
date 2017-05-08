$(document).ready(function(){
	$("#comment-submit").click(function(){
		var comment = $("#form-comment textarea[name=comment]").val();
		var slug = $(this).data("slug");
		var url = "/add/comment/" + slug;
		$.post(url,
		{
			"comment": comment
		},
		function(data, status){
			console.log(status);
		});
	});

	$('.comment-detail .delete').click(function(){
		var slug = $(this).data("slug");
		var idComment = $(this).data("id");
		var url = '/delete/comment/' + slug + "/" + idComment;
		if(confirm("Delete comment?")){
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result){
					console.log('Deleting Comment...');
					window.location.href = "/";
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
});