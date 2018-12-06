# Here go your api methods.

def set_stars():
    """Sets the star rating of a post."""
    post_id = int(request.vars.post_id)
    rating = int(request.vars.rating)
    db.user_star.update_or_insert(
        (db.user_star.post_id == post_id) & (db.user_star.user_email == auth.user.email),
        post_id = post_id,
        user_email = auth.user.email,
        rating = rating
    )
    return "ok" # Might be useful in debugging.
