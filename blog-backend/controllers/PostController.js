import PostModel from '../models/Post.js';

//--------------------------------------------------------------------

export const create = async (req, res) => {
  try {
    const doc = new PostModel({  
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags.split(','),
      imageUrl: req.body.imageUrl,
      user: req.userId,
    })

    const post = await doc.save(); 

    res.json(post); 

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create an article",
    });
  }
}

//--------------------------------------------------------------------

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map(obj => obj.tags)
      .flat() 
      .slice(0, 5); 
    res.json(tags);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Couldn't get the tags",
    });
  }
}

//--------------------------------------------------------------------

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Couldn't get the articles",
    });
  }
}

//--------------------------------------------------------------------

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id; 

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      }, 
      {
        $inc: { viewsCount: 1 }
      }, 
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {  
          console.log(err);
          return res.status(500).json({
            message: "Failed to return the article",
          });
        };

        if (!doc) {  
          return res.status(404).json({
            message: 'Article not found',
          });
        };

        res.json(doc); 
      },
    ).populate('user');

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get the articles",
    });
  }
}
  
//--------------------------------------------------------------------

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;  

    await PostModel.findOneAndDelete({
        _id: postId,
      }, 
      (err, doc) => {
        if (err) {  
          console.log(error);
          return res.status(500).json({
            message: "1. Couldn't delete the article",
          });
        }

        if (!doc) {  
          return res.status(404).json({
            message: 'Article not found',
          });
        }

        res.json({ 
          success: true
        });
      }
    ).clone();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "2. Couldn't delete the article",
    });
  }
}
  
//--------------------------------------------------------------------

export const update = async (req, res) => {
  try {
    const postId = req.params.id;  

    await PostModel.updateOne({
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags.split(','),
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({ 
      success: true
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update the article",
    });
  }
}

