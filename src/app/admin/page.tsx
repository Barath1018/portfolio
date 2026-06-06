'use client';

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from 'next/image';
import { Plus, Trash2, Edit2, Save, X, ExternalLink, Github, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';

interface Project {
  id?: number;
  company?: string;
  year?: string;
  title: string;
  description: string;
  link?: string;
  repo?: string;
  image: string;
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        fetchProjects();
      } else {
        setLoginError('Invalid password');
      }
    } catch (error) {
      setLoginError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editForm) return;

    setUploading(true);

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const data = await response.json();
      if (data.url) {
        setEditForm({ ...editForm, image: data.url });
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const saveProject = async (project: Project) => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (response.ok) {
        fetchProjects();
        setMessage('Successfully saved!');
        setTimeout(() => setMessage(''), 3000);
        setIsEditing(null);
        setIsAdding(false);
        setEditForm(null);
      } else {
        setMessage('Failed to save.');
      }
    } catch (error) {
      console.error('Failed to save projects:', error);
      setMessage('Error saving project.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (index: number) => {
    setIsEditing(index);
    setEditForm({ ...projects[index] });
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        fetchProjects();
        setMessage('Project deleted.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditForm({
      company: '',
      year: '',
      title: '',
      description: '',
      link: '',
      repo: '',
      image: ''
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 border-gray-800 bg-gray-900">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter your password to manage projects</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password"
                placeholder="Password"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20"
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <SectionHeader 
              eyebrow="Admin Portal"
              title="Manage Projects" 
              description="Add, edit, or remove projects from your portfolio." 
            />
            <button onClick={handleLogout} className="text-gray-500 hover:text-white text-sm mt-2 text-left transition-colors flex items-center gap-1">
              <X size={14} /> Logout
            </button>
          </div>
          <button 
            onClick={startAdding}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20"
          >
            <Plus size={20} />
            <span>Add Project</span>
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center font-bold ${message.includes('Fail') || message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {message}
          </div>
        )}

        {(isEditing !== null || isAdding) && editForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full p-8 bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-white">{isAdding ? 'Add New Project' : 'Edit Project'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                  <input 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-purple-500"
                    value={editForm.company}
                    onChange={e => setEditForm({...editForm, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year</label>
                  <input 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-purple-500"
                    value={editForm.year}
                    onChange={e => setEditForm({...editForm, year: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                  <input 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-purple-500"
                    value={editForm.title}
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                  <textarea 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-purple-500 h-24"
                    value={editForm.description}
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Demo Link</label>
                  <input 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-purple-500"
                    value={editForm.link}
                    onChange={e => setEditForm({...editForm, link: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Repo Link</label>
                  <input 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-purple-500"
                    value={editForm.repo}
                    onChange={e => setEditForm({...editForm, repo: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Image</label>
                  <div className="flex items-center gap-4 mt-2">
                    {editForm.image && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image 
                          src={editForm.image} 
                          alt="Preview" 
                          fill 
                          className="object-cover rounded-lg border border-gray-700"
                          unoptimized
                        />
                      </div>
                    )}
                    <label className="flex-grow">
                      <div className="flex items-center justify-center w-full h-20 px-4 transition bg-gray-800 border-2 border-gray-700 border-dashed rounded-lg appearance-none cursor-pointer hover:border-purple-500 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          {uploading ? (
                            <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                          ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                          )}
                          <span className="font-medium text-gray-400">
                            {uploading ? 'Uploading...' : 'Click to upload image'}
                          </span>
                        </span>
                        <input type="file" name="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  onClick={() => { setIsAdding(false); setIsEditing(null); setEditForm(null); }}
                  className="px-6 py-2 rounded-lg font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => saveProject(editForm)}
                  disabled={loading || uploading}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Save size={18} />}
                  <span>{isAdding ? 'Create Project' : 'Save Changes'}</span>
                </button>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 bg-gray-800/50 border-gray-700 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  {project.image && (
                    <div className="relative size-16 flex-shrink-0">
                      <Image 
                        src={project.image} 
                        alt="" 
                        fill 
                        className="object-cover rounded-lg border border-gray-700"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    {(project.company || project.year) && (
                      <div className="text-purple-400 text-xs font-bold uppercase tracking-widest">
                        {project.company || ''} {project.company && project.year ? '•' : ''} {project.year || ''}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => startEdit(index)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => project.id && deleteProject(project.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                {project.link && (
                  <div className="flex items-center gap-1 max-w-[150px]">
                    <ExternalLink size={14} />
                    <span className="truncate">{project.link}</span>
                  </div>
                )}
                {project.repo && (
                  <div className="flex items-center gap-1 max-w-[150px]">
                    <Github size={14} />
                    <span className="truncate">{project.repo}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
          {projects.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No projects found. Click "Add Project" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
