import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Todo } from "../models/todoSchema.js";

export const getAlltodos = catchAsyncError(async (req, res, next) => {
    const today = Date.now();
    const todo = await Todo.find({ postedBy: req.user.id, complete: false, cdate: {$gte: today} });
    res.status(200).json({
      success: true,
      todo,
    });
});

export const posttodo = catchAsyncError(async (req, res, next) => {
    const {} = req.user;
    const { title, description, cdate, priority, favourite, complete, remind, rdate } = req.body;
    if( !title ||  !description || !cdate ){
        return next(new ErrorHandler("Please provide title, description and completion date"));
    }
    const postedBy = req.user._id;
    const todo = await Todo.create({
        title, description, cdate, priority, favourite, complete, remind, rdate, postedBy
    });
    res.status(200).json({
        success: true,
        message: "Todo Added Successfully!",
        todo,
    });
});

export const updatetodo = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let todo = await Todo.findById(id);
    if (!todo) {
        return next(new ErrorHandler("OOPS! Todo not found.", 404));
    }
    todo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Todo Updated!",
    });
});

export const deletetodo = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return next(new ErrorHandler("OOPS! Todo not found.", 404));
    }
    await todo.deleteOne();
    res.status(200).json({
      success: true,
      message: "Todo Deleted!",
    });
});

export const getAlltodosbyPriority = catchAsyncError(async (req, res, next) => {
    const today = Date.now();
    const sortBy = req.query.sortBy || 'asc'; // Default to ascending order
    let sortOptions = {}; // Define sort options

    if (sortBy === 'asc') {
        sortOptions = { priority: 1 }; // Ascending order
    } else if (sortBy === 'desc') {
        sortOptions = { priority: -1 }; // Descending order
    }
    const todo = await Todo.find({ postedBy: req.user.id, complete: false, cdate: {$gte: today} }).sort(sortOptions);
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getAlltodosbyDate = catchAsyncError(async (req, res, next) => {
    const today = Date.now();
    const sortBy = req.query.sortBy || 'asc'; // Default to ascending order
    let sortOptions = {}; // Define sort options

    if (sortBy === 'asc') {
        sortOptions = { cdate: 1 }; // Ascending order
    } else if (sortBy === 'desc') {
        sortOptions = { cdate: -1 }; // Descending order
    }
    const todo = await Todo.find({ postedBy: req.user.id, complete: false, cdate: {$gte: today} }).sort(sortOptions);
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getAlltodosbyCrDate = catchAsyncError(async (req, res, next) => {
  const today = Date.now();
  const sortBy = req.query.sortBy || 'asc'; // Default to ascending order
  let sortOptions = {}; // Define sort options

  if (sortBy === 'asc') {
      sortOptions = { createdAt: 1 }; // Ascending order
  } else if (sortBy === 'desc') {
      sortOptions = { createdAt: -1 }; // Descending order
  }
  const todo = await Todo.find({ postedBy: req.user.id, complete: false, cdate: {$gte: today} }).sort(sortOptions);
  res.status(200).json({
    success: true,
    todo,
  });
});

export const getAlltodosbyFavourite = catchAsyncError(async (req, res, next) => {
    const todo = await Todo.find({ postedBy: req.user.id, complete: false, favourite: true });
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getAlltodosbyNotFavourite = catchAsyncError(async (req, res, next) => {
  const todo = await Todo.find({ postedBy: req.user.id, complete: false, favourite: false });
  res.status(200).json({
    success: true,
    todo,
  });
});

export const getTotaltodos = catchAsyncError(async (req, res, next) => {
    const todo = await Todo.find({ postedBy: req.user.id});
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getTotaltodosFavourite = catchAsyncError(async (req, res, next) => {
  const todo = await Todo.find({ postedBy: req.user.id, favourite: true}).sort(sortOptions);
  res.status(200).json({
    success: true,
    todo,
  });
});

export const getTotaltodosNotFavourite = catchAsyncError(async (req, res, next) => {
  const todo = await Todo.find({ postedBy: req.user.id, favourite: false}).sort(sortOptions);
  res.status(200).json({
    success: true,
    todo,
  });
});

export const getTotaltodosComplete = catchAsyncError(async (req, res, next) => {
    const todo = await Todo.find({ postedBy: req.user.id, complete: true}).sort(sortOptions);
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getTotaltodosNotcomplete = catchAsyncError(async (req, res, next) => {
    const todo = await Todo.find({ postedBy: req.user.id, complete: false}).sort(sortOptions);
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getTotaltodosbyDate = catchAsyncError(async (req, res, next) => {
    const sortBy = req.query.sortBy || 'asc'; // Default to ascending order 
    let sortOptions = {}; // Define sort options

    if (sortBy === 'asc') {
        sortOptions = { cdate: 1 }; // Ascending order
    } else if (sortBy === 'desc') {
        sortOptions = { cdate: -1 }; // Descending order
    }
    const todo = await Todo.find({ postedBy: req.user.id}).sort(sortOptions);
    res.status(200).json({
      success: true,
      todo,
    });
});

export const getTotaltodosCrbyDate = catchAsyncError(async (req, res, next) => {
  const sortBy = req.query.sortBy || 'asc'; // Default to ascending order 
  let sortOptions = {}; // Define sort options

  if (sortBy === 'asc') {
      sortOptions = { createdAt: 1 }; // Ascending order
  } else if (sortBy === 'desc') {
      sortOptions = { createdAt: -1 }; // Descending order
  }
  const todo = await Todo.find({ postedBy: req.user.id}).sort(sortOptions);
  res.status(200).json({
    success: true,
    todo,
  });
});

export const getTotaltodosbyPriority = catchAsyncError(async (req, res, next) => {
  const sortBy = req.query.sortBy || 'asc'; // Default to ascending order 
  let sortOptions = {}; // Define sort options

  if (sortBy === 'asc') {
      sortOptions = { priority: 1 }; // Ascending order
  } else if (sortBy === 'desc') {
      sortOptions = { priority: -1 }; // Descending order
  }
  const todo = await Todo.find({ postedBy: req.user.id}).sort(sortOptions);
  res.status(200).json({
    success: true,
    todo,
  });
});

export const getSingleTodo = catchAsyncError(async(req,res,next)=>{
  const todoId = req.params.id; // Assuming the todo ID is passed as a route parameter

  // Retrieve the todo from the database
  const todo = await Todo.findById(todoId);

  if (!todo) {
    return next(new ErrorHandler("Todo not found", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});