const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas 
	eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Praesent commodo cursus magna, vel 
	scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
	Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl 
	consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.`,
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, 
	egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Praesent commodo cursus 
	magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor 
	auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl 
	consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.`,
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "8616a608a4997b64": {
	id: '8616a608a4997b64',
	timestamp: 1510526683000,
	title: 'Is React the best Javascript framework?',
	body: `Nullam non efficitur ligula. Phasellus lobortis in tellus a fermentum. Pellentesque habitant 
	morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras feugiat, nisl eu 
	tincidunt interdum, odio leo tempor libero, eget aliquam odio massa sed ipsum. Morbi pretium 
	vestibulum blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per 
	inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
	turpis egestas. Ut convallis finibus est, et facilisis ligula imperdiet vehicula. Aliquam erat 
	volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
	Etiam vel tellus et enim mollis tempor quis at ex. Suspendisse efficitur aliquam massa in 
	condimentum. Aenean faucibus elit eros, ac varius lacus dignissim vitae. Donec tempor vehicula 
	fringilla. In molestie id lacus nec consectetur. Maecenas elit sapien, eleifend vel arcu sed, 
	lacinia tincidunt eros.`,
	author: 'ReactFanatic',
	category: 'react',
	voteScore: 4,
	deleted: false,
	commentCount: 2
  },
  "8445bf0d44ae3dcc": {
	id: '8445bf0d44ae3dcc',
	timestamp: 1509449574000,
	title: "Redux the better way to manage your application's data",
	body: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas 
	eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, 
	vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
	Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl 
	consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.Cras mattis 
	consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo 
	risus, porta ac consectetur ac, vestibulum at eros.`,
	author: 'ReduxWizard',
	category: 'redux',
	voteScore: 3,
    deleted: false,
    commentCount: 1
  },
  "9d031a6fa369cecb": {
	id: '9d031a6fa369cecb',
	timestamp: 1506245492000,
	title: 'Udacity the coolest place to hang out since Chuck E. Cheese.',
	body: `Integer nisi mauris, hendrerit vel arcu eu, egestas sagittis ligula. Pellentesque a venenatis odio. 
	Maecenas semper aliquet mattis. Nunc dictum nisi risus, et hendrerit nulla pulvinar a. Nam malesuada magna 
	quis nulla varius suscipit. Vivamus arcu risus, porta et volutpat a, efficitur at justo. Donec lorem diam, 
	posuere eu faucibus a, dictum non erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur 
	lacinia dolor ut sem elementum, ac ullamcorper lectus pharetra. Duis a fringilla magna.`,
	author: 'Yu Dat City',
	category: 'udacity',
	voteScore: 7,
	deleted: false,
	commentCount: 3
  },
  "b80c30fdde431451": {
	id: 'b80c30fdde431451',
	timestamp: 1492154679000,
	title: 'Words that rhyme with Udacity.',
	body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis convallis sem at pellentesque. 
	Morbi fringilla sed ipsum vel aliquam. Duis ultrices odio turpis, non venenatis libero commodo in. Fusce
	ultrices mollis sapien. Donec quis luctus lorem. Nulla volutpat mi vel odio commodo rutrum sed eget velit. 
	Etiam efficitur facilisis est sed dignissim. Ut volutpat in metus ac vehicula. In efficitur, sapien vitae 
	blandit pretium, justo sem tincidunt elit, non rutrum orci sem eget elit. Nam sit amet facilisis diam. 
	Etiam ac urna convallis turpis blandit bibendum a in tortor. Suspendisse volutpat leo a enim sollicitudin 
	malesuada. Integer sed nibh quis tellus consectetur placerat placerat sed metus. Phasellus id dui nunc.`,
	author: 'BoredGuy123',
	category: 'udacity',
	voteScore: -2,
	deleted: false,
	commentCount: 1	  
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
