"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lead_1 = __importDefault(require("../models/Lead"));
const createLead = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const lead = new Lead_1.default(data);
    yield lead.save();
    return lead;
});
const getAllLeads = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Lead_1.default.find();
});
const getLeadById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Lead_1.default.findById(id);
});
const updateLead = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Lead_1.default.findByIdAndUpdate(id, data, { new: true });
});
const deleteLead = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Lead_1.default.findByIdAndDelete(id);
});
exports.default = {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
};
