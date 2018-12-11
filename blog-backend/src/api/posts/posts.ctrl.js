const Post = require('models/post');

let postId = 1; // 초기값;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용'
  }
];

/* 포스트작성
  POST /api/posts
  {title, body}
*/
exports.write = async (ctx) => {
  const {title, body, tags} = ctx.request.body;

  //새 인스턴스
  const post = new Post({title, body, tags});

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/* 포스트 목록 조회
  GET /api/posts
*/
exports.list = async (ctx) => {

  const page = parseInt(ctx.request.page || 1, 10);

  if(page < 1) {
    ctx.status = 404;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({_id: -1})
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.count().exec();

    //POSTS.POST.BODY 길이 200이상인 경우 자른후 POSTS.POST.BODY에 다시 세팅.
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`
    });
    ctx.body = posts.map((limitBodyLength));
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts;
  } catch(e) {
    ctx.throw(e);
  }
};

/* 특정 포스트 조회
  GET /api/posts/:id
*/
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // 포스트가 존재하지 않음
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/* 특정 포스트 제거
  DELETE /api/posts/:id
*/
exports.remove = (ctx) => {
  const {id} = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      messsage: '포스트가 존재하지 않습니다.'
    };
    return;
  }

  posts.splice(index, 1);
  ctx.status = 204; //No Content
};

/* 포스트 수정(교체)
  PUT /api/posts/:id
  {title, body}
*/
exports.replace = (ctx) => {
  const {id} = ctx.params;

  const index = posts.findIndex(p => p.id.tostring() === id);

  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      messsage: '포스트가 존재하지 않습니다.'
    };
    return;
  }

  posts[index] = {
    id,
    ...ctx.request.body
  };
  ctx.body = posts[index];
};

/* 포스트 수정 (특정 필드 변경)
  PATCH /api/posts/:id
  {title, body}
*/
exports.update = (ctx) => {
  const {id} = ctx.params;

  const index = posts.findIndex(p => p.id.tostring() === id);

  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      messsage: '포스트가 존재하지 않습니다.'
    };
    return;
  }

  posts[index] = {
    ...posts[index],
    ...ctx.request.body
  };
  ctx.body = posts[index];
}
