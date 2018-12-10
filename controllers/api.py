# Here go your api methods.
def get_post_list():
    results = []
    if auth.user is None:
        # Not logged in.
        rows = db().select(db.post.ALL, orderby=~db.post.post_time)
        for row in rows:
            results.append(dict(
                id=row.id,
                post_title=row.post_title,
                post_content=row.post_content,
                post_author=row.post_author,
                rating = None, # As above
            ))
    else:
        # Logged in.
        rows = db().select(db.post.ALL, db.user_star.ALL,
                            left=[
                                db.user_star.on((db.user_star.post_id == db.post.id) & (db.user_star.user_email == auth.user.email)),
                            ],
                            orderby=~db.post.post_time)
        for row in rows:
            results.append(dict(
                id=row.post.id,
                post_title=row.post.post_title,
                post_content=row.post.post_content,
                post_author=row.post.post_author,
                rating = None if row.user_star.id is None else row.user_star.rating,
            ))
    # For homogeneity, we always return a dictionary.
    return response.json(dict(post_list=results))

def set_stars():
    """Sets the star rating of a post."""
    post_id = int(request.vars.post_id)
    rating = int(request.vars.rating)
    db.user_star.update_or_insert(
        (db.user_star.post_id == post_id),
        post_id = post_id,
        user_email = auth.user.email,
        rating = rating
    )
    return "ok" # Might be useful in debugging.
