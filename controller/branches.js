const mongoose = require('mongoose');
const Branch = require('../models/branch');

const findAllBranches = (req, res) => {
  Branch.find().then((branches) => {
    res.status(200).json(branches);
  },
  err => {
    err && res.status(500).send(err.message);
  });
};

const findbyId = (req, res) => {
  console.log(req.params.id);
  Branch.findById(req.params.id).then((branch) => {
    res.status(200).json(branch);
  },
  err => {
    err && res.status(500).send(err.message);
  });
};

const removeById = (req, res) => {
  console.log(req.params.id);
  Branch.findByIdAndRemove(req.params.id).then((branch) => {
    res.status(200).json(branch);
  },
  err => {
    err && res.status(500).send(err.message);
  });
};

const addBranch = (req, res) => {
  let branch = new Branch({
    name: req.body.name,
    manager_name: req.body.manager_name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  branch.save().then((branch) => {
    res.status(200).json(branch);
  },
  err => {
    err && res.status(500).send(err.message);
  });
};

const updateBranchLocation = (req, res) => {
  console.log(req.params.id);
  const key = Object.keys(req.body)[0];
  const parsedKey = JSON.parse(key);

  Branch.updateOne({_id:parsedKey.id},
    {latitude:parsedKey.latitude, 
      longitude:parsedKey.longitude}).then((branch) => {
    res.status(200).json(branch);
      },
      err => {
        err && res.status(500).send(err.message);
      });
};

const updBranchLocation = (req, res) => {
  console.log(req.body);
  Branch.updateOne({_id:req.body.id},
    {latitude:req.body.latitude,
    longitude:req.body.longitude}).then((branch) => {
      res.status(200).json(branch);
    },
    err => {
      err && res.status(500).send(err.message);
    });
};

const findAllGeoBranches = (req,res)=>{
  Branch.find().then((branches) => {
    console.log("branches findAll geoBranches success");
    var geoBranches = {type:"FeatureCollection", features:[]};
    branches.map(item=>{
      geoBranches.features.push({
        type:"Feature",
        geometry:{
          type:"Point",
          coordinates:[item.longitude,item.latitude]
        },
        properties:{
          name:item.name,
          name_manager:item.manager_name
        },
        id:item._id
      });
    });
    res.status(200).json(geoBranches);
  },
  err => {
    console.log("branches findAll geoBranches error");
    err && res.status(500).send(err.message);
  });
}

const findByName = (req, res) => {
  console.log(req.params.name);
  Branch.find({name:req.params.name}).then((branch) => {
    res.status(200).json(branch);
  },
  err => {
    err && res.status(500).send(err.message);
  });
};

module.exports = {findAllBranches, findbyId, removeById, addBranch, updateBranchLocation, updBranchLocation, findAllGeoBranches, findByName};