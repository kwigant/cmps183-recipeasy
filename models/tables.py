# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.

# logger.info("The user record is: %r" % auth.user)

import datetime

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_username():
    return None if auth.user is None else auth.user.username

def get_current_time():
    return datetime.datetime.utcnow()

# post_author should get_user_name instead
db.define_table('post',
                # Field('post_author_email', default=get_user_email()),
                Field('post_author', default=get_username()),
                Field('post_title'),
		Field('post_difficulty', requires=IS_IN_SET(['beginner', 'intermediate', 'Hard', 'Master'])),
                Field('post_dietary_restriction', requires=IS_IN_SET(['', 'Vegetarian', 'gluten free', 'Vegan',
                                                                      'Pescetarian', 'Kosher', 'Alcohol free',
                                                                      'dairy product free'])),
                Field('post_type_of_meal', requires=IS_IN_SET(['Breakfast', 'Lunch', 'Dinner', 'Brunch' 'Dessert',
                                                               'Alcohol', 'Snacks'])),
                Field('post_cooktime', requires=IS_IN_SET(['Under 15 mins', '16 - 30 mins', '31 - 45 mins', '46 - 60 mins',
                                                           '1 - 2 hours', '3 - 4 hours', '4 hours or above'])),
                Field('post_ingredients', type='list:string'),
                Field('post_instruction', 'text'),
                Field('post_time', 'datetime', update=get_current_time()),
                )

# db.post.post_author_email.readable = False
db.post.post_time.readable = db.post.post_time.writable = False
db.post.post_author.writable = False
db.post.id.readable = False
# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)


# Stars ratings
db.define_table('user_star',
                Field('user_email'), # The user who starred
                Field('post_id', 'reference post'), # The starred post
                Field('rating', 'integer', default=None) # The star rating.
                )

# Replies
db.define_table('reply',
                Field('post_id', 'reference post'),
                Field('reply_author', default=get_user_email()),
                Field('reply_content', 'text'),
                Field('reply_time', 'datetime', update=get_current_time())
                )
db.reply.reply_author.writable = False
db.reply.id.readable = False

