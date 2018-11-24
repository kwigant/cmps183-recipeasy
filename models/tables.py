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
                Field('post_dietary_restriction'),
                Field('post_type_of_meal'),
                Field('post_cooktime'),
                Field('post_ingredients', 'text'),
                Field('post_instruction', 'text'),
                Field('post_time', 'datetime', update=get_current_time()),
                )

# db.post.post_author_email.readable = False
db.post.post_time.readable = db.post.post_time.writable = False
db.post.post_author.writable = False
db.post.id.readable = False
# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)

# Replies

db.define_table('reply',
                Field('post_id', 'reference post'),
                Field('reply_author', default=get_user_email()),
                Field('reply_content', 'text'),
                Field('reply_time', 'datetime', update=get_current_time())
                )
db.reply.reply_author.writable = False
db.reply.id.readable = False
