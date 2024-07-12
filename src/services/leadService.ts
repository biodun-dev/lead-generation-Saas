import Lead from '../models/Lead';

const createLead = async (data: any) => {
  const lead = new Lead(data);
  await lead.save();
  return lead;
};

const getAllLeads = async () => {
  return await Lead.find();
};

const getLeadById = async (id: string) => {
  return await Lead.findById(id);
};

const updateLead = async (id: string, data: any) => {
  return await Lead.findByIdAndUpdate(id, data, { new: true });
};

const deleteLead = async (id: string) => {
  return await Lead.findByIdAndDelete(id);
};

export default {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
