$(document).ready(function(){

    var url = window.location.search;
    var postId;

    var updating = false;

    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId);
    }

    var titleInput = $("#title");
    var bodyInput = $("#body");
    var imageInput = $("#image");
    var cmsForm = $("#cms");
    var postCategorySelect = $("#category");

    postCategorySelect.val();

    // Event listener on form
    $(cmsForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();

        // if title or body is missing, form won't submit
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !imageInput.val().trim()) {
            return;
        }

        var file = imageInput.prop('files')[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            console.log(reader.result);
            
            var newPost = {
            category: postCategorySelect.val(),
            title: titleInput.val().trim(),
            body: bodyInput.val().trim(),            
            image: reader.result
            };
            
            console.log("New Post: " + newPost);

            if (updating) {
                newPost.id = postId;
                updatePost(newPost);
            } else {
            submitPost(newPost);
            }
        };

        reader.onerror = function(error) {
            console.log('Error', error);
        };
    });

    function submitPost(post) {
        $.post("/api/posts", post, function() {
            window.location.href = "/";
        });
    }

    function getPostData(id) {
        console.log(id);
        $(".post-delete").attr("postId", id);
        $.get("/api/posts/" + id, function(data) {
            if (data) {
                titleInput.val(data.title);
                bodyInput.val(data.body);
                postCategorySelect.val(data.category);
                imageInput.val(data.image);
                updating = true; 
            }
        });
    }

    function updatePost(post) {
        $.put("/api/posts", post, function() {
            window.location.href = "/";
        });
    }

    $(document).on("click", "a.post-delete", handlePostDelete);

    function deletePost(id) {
        $.ajax({
            method: 'DELETE',
            url: "/api/posts/" + id
        }).then(function() {
            window.location.href="/";
        });
    }

    function handlePostDelete() {
        var currentPost = $(this).attr("postId");
        deletePost(currentPost);
        // window.location.href = "/cms?post_id" + currentPost.id;
    }

});