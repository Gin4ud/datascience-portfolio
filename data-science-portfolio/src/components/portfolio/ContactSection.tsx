import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Calendar,
  Send,
  Phone,
  Download,
  MessageSquare,
  CheckCircle,
  Clock
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'alex.johnson@email.com',
      href: 'mailto:alex.johnson@email.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'Availability',
      value: 'Open to new opportunities',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      username: 'alexjohnson-ds',
      href: 'https://linkedin.com/in/alexjohnson-ds',
      color: 'hover:bg-blue-600'
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      username: 'alexj-data',
      href: 'https://github.com/alexj-data',
      color: 'hover:bg-gray-600'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Twitter',
      username: '@alexjohnson_ai',
      href: 'https://twitter.com/alexjohnson_ai',
      color: 'hover:bg-blue-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Let's Build Something Amazing Together
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your data challenges into production-ready solutions? 
              I'd love to discuss how we can leverage data science and modern web technologies 
              to drive real business impact.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Send Me a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            placeholder="Your Name *"
                            {...register('name')}
                            className={errors.name ? 'border-red-500' : ''}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email *"
                            {...register('email')}
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            placeholder="Company (Optional)"
                            {...register('company')}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Subject *"
                            {...register('subject')}
                            className={errors.subject ? 'border-red-500' : ''}
                          />
                          {errors.subject && (
                            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Textarea
                          placeholder="Tell me about your project, challenges, or how I can help... *"
                          rows={6}
                          {...register('message')}
                          className={errors.message ? 'border-red-500' : ''}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href.startsWith('#') ? (
                          <p className="font-medium">{item.value}</p>
                        ) : (
                          <a 
                            href={item.href}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 hover:shadow-md group"
                      >
                        <div className={`p-2 rounded-lg text-white ${social.color} bg-gray-600 transition-colors`}>
                          {social.icon}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {social.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {social.username}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resume Download */}
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Download className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-semibold text-foreground">Download Resume</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete overview of experience, skills, and projects
                    </p>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Resume
                  </Button>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-foreground">Available for Projects</p>
                      <p className="text-sm text-muted-foreground">
                        Currently accepting new opportunities
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">Freelance</Badge>
                    <Badge variant="secondary">Full-time</Badge>
                    <Badge variant="secondary">Consulting</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Meeting Scheduler */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="text-center">
              <CardContent className="p-8">
                <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Schedule a Discovery Call
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's discuss your data challenges and explore how my full-stack data science 
                  approach can deliver measurable results for your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group">
                    <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Schedule 30-min Call
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Quick Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;