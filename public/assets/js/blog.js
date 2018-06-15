$(document).ready(function() {

    // blogContainer holds ALL of our posts
    var blogContainer = $("#blogContainer");
    
    // if ADMIN, button to edit POST --> direct to CMS page
    $(document).on("click", "button.post-edit", handlePostEdit);
    // if ADMIN, button to create NEW POST --> direct to CMS page
    $(document).on("click", "button.new-post", handleNewPost);

    function getPosts() {
        $.get("/api/posts", function(data) {
            console.log("Posts", data)
            if (!data || !data.length) {
              displayEmpty();
            }
            else {
              initializeRows(data);
            }
        });
    }

    getPosts();

    function displayEmpty() {
        blogContainer.empty();
        var noPostsMessage = $("<h2>");
        // noPostsMessage.css({});
        noPostsMessage.hmtl("There are no blog posts yet!");
        blogContainer.append(noPostsMessage);
    }

    function initializeRows(data) {
        console.log("initialize: ", data);
        blogContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            postsToAdd.push(createNewRow(data[i]));
        }
        blogContainer.prepend(postsToAdd);
    }

    function createNewRow(data) {
        console.log("Data", data);
        var newPost = $("<div>");

        newPost.load("post.html", function() {
            var id = newPost.find(".post-edit");
            id.attr("postId", data.id);
            console.log(newPost);
            var title = newPost.find(".post-title");
            console.log(title);
            title.html(data.title);
            var body = newPost.find(".post-body");
            body.html(data.body);
            var category = newPost.find(".category");
            category.html(data.category);
            var image = newPost.find(".post-image");
            image.attr("src", data.image);
            blogContainer.prepend(newPost);  
        });
    }

    function handleNewPost() {
        window.location.href = "/cms";
    }

    function handlePostEdit() {
        var currentPost = $(this).attr("postId");
        localStorage.id = currentPost;
        window.location.href = "/cms?post_id=" + currentPost;
    }    

});