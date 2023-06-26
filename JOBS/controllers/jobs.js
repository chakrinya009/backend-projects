const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const jobs = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!jobs) {
    throw new NotFoundError(`No job with ${jobId}`);
  }

  res.status(StatusCodes.OK).json(jobs);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("company or position cannot be empty");
  }

  const jobs = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!jobs) {
    throw new NotFoundError(`No job with ${jobId}`);
  }

  res.status(StatusCodes.OK).json(jobs);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const jobs = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!jobs) {
    throw new NotFoundError(`No job with ${jobId}`);
  }

  res.status(StatusCodes.OK).json(jobs);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
