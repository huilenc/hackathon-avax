'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/utils/supabase/client';

interface ProjectUploadDialogProps {
  profileId: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function ProjectUploadDialog({ profileId, onSuccess, trigger }: ProjectUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Project title is required');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Upload image if exists
      let imageUrl = null;
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // Create project record
      const { data, error: insertError } = await supabase
        .from('projects')
        .insert({
          profile_id: profileId,
          title,
          description,
          tags,
          project_url: projectUrl,
          image_url: imageUrl,
          created_at: new Date().toISOString()
        })
        .select();

      if (insertError) throw insertError;

      // Reset form and close dialog
      setTitle('');
      setDescription('');
      setTags('');
      setProjectUrl('');
      setImageFile(null);
      setImagePreview(null);
      setOpen(false);

      // Call success callback if provided
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error uploading project:', err);
      setError('Failed to upload project. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-primary hover:opacity-90 border border-ruby-light">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-2 border-ruby-lighter">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-primary text-white">
            <DialogTitle className="text-2xl font-bold flex items-center">
              <span className="mr-2">Add New Project</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="h-6 w-6 rounded-full bg-gold flex items-center justify-center text-ruby-dark text-xs font-bold">+</div>
              </motion.div>
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Showcase your work to potential clients
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-ruby-dark font-medium">Project Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-ruby-dark font-medium">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project"
                className="min-h-[100px] border-ruby-lighter focus:border-ruby focus:ring-ruby"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-ruby-dark font-medium">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. Web3, Smart Contract, UI Design (comma separated)"
                className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectUrl" className="text-ruby-dark font-medium">Project URL (optional)</Label>
              <Input
                id="projectUrl"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://..."
                className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-ruby-dark font-medium">Project Image</Label>
              
              <AnimatePresence>
                {imagePreview ? (
                  <motion.div 
                    className="relative rounded-md overflow-hidden h-48 bg-neutral-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Image
                      src={imagePreview}
                      alt="Project preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div 
                      className="border-2 border-dashed border-ruby-lighter rounded-md p-8 text-center cursor-pointer hover:bg-ruby-lighter/10 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-10 w-10 mx-auto mb-2 text-ruby-light" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (max 5MB)
                      </p>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <DialogFooter className="pt-4 flex gap-2 flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-ruby hover:bg-ruby-lighter/10"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isUploading}
                className="bg-gradient-primary hover:opacity-90 border border-ruby-light"
              >
                {isUploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Upload className="h-4 w-4" />
                    </motion.div>
                    Uploading...
                  </>
                ) : (
                  <>Save Project</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
