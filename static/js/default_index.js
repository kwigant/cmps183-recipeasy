// This is the js for the default/index.html view.

var app = function () {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function (a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };
     // Enumerates an array.
    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};

    self.get_posts = function() {
        $.getJSON(get_post_list_url,
            function(data) {
                // I am assuming here that the server gives me a nice list
                // of posts, all ready for display.
                self.vue.post_list = data.post_list;
                // Post-processing.
                self.process_posts();
                console.log("I got my list");
            }
        );
        console.log("I fired the get");
    };
    self.count_reply = function(){
	$.getJSON(get_reply_count, 
            function(data) {
                // I am assuming here that the server gives me a nice list
                // of posts, all ready for display.
                self.vue. = data.post_list;
                // Post-processing.
                self.process_posts();
                console.log("I got my list");
            }
        );
        console.log("I fired the get");
	
    }
    self.process_posts = function() {
        // This function is used to post-process posts, after the list has been modified
        // or after we have gotten new posts. 
        // We add the _idx attribute to the posts. 
        enumerate(self.vue.post_list);
        // We initialize the smile status to match the like. 
        self.vue.post_list.map(function (e) {
            // Number of stars to display.
            Vue.set(e, '_num_stars_display', e.rating);
	});
    };

    // Code for star ratings.
    self.stars_out = function (post_idx) {
        // Out of the star rating; set number of visible back to rating.
        var p = self.vue.post_list[post_idx];
        p._num_stars_display = p.rating;
    };

    self.stars_over = function(post_idx, star_idx) {
        // Hovering over a star; we show that as the number of active stars.
        var p = self.vue.post_list[post_idx];
        p._num_stars_display = star_idx;
    };

    self.set_stars = function(post_idx, star_idx) {
        // The user has set this as the number of stars for the post.
        var p = self.vue.post_list[post_idx];
        p.rating = star_idx;
        // Sends the rating to the server.
        $.post(set_stars_url, {
            post_id: p.id,
            rating: star_idx
        });
    };


    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            post_list: [],
            star_indices: [1, 2, 3, 4, 5],
            post_dietary_restriction: '',
        },
        methods: {
            // Star ratings.
            stars_out: self.stars_out,
            stars_over: self.stars_over,
            set_stars: self.set_stars, 
 	    count_reply: self.count_reply,
	}

    });
     // Gets the posts.
    self.get_posts();

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function () {
    APP = app();
});

$('.carousel').carousel({
    interval: 2000
});
