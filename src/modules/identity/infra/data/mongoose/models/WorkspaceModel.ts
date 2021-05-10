import mongoose from 'mongoose';

export const WorkspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { collection: 'Workspaces' },
);

export default mongoose.model('Workspace', WorkspaceSchema);
