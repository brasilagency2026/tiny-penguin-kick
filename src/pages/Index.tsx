import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShoppingBag, ArrowRight, Baby, GraduationCap, PartyPopper, Church, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Liens à remplacer par vos vraies annonces Mercado Livre
  const categories = [
    { 
      icon: <Heart className="text-rose-500" />, 
      title: "Mariage", 
      desc: "Élégance et romantisme pour votre grand jour.",
      mlLink: "https://www.mercadolivre.com.br/p/mariage-digital", // Exemple
      color: "bg-rose-50"
    },
    { 
      icon: <Baby className="text-blue-400" />, 
      title: "Naissance", 
      desc: "Annoncez l'arrivée de votre petit trésor.",
      mlLink: "https://www.mercadolivre.com.br/p/naissance-digital", // Exemple
      color: "bg-blue-50"
    },
    { 
      icon: <GraduationCap className="text-slate-700" />, 
      title: "Diplôme", 
      desc: "Célébrez votre réussite académique.",
      mlLink: "https://www.mercadolivre.com.br/p/diplome-digital", // Exemple
      color: "bg-slate-50"
    },
    { 
      icon: <PartyPopper className="text-yellow-500" />, 
      title: "Anniversaire", 
      desc: "Une fête inoubliable pour tous les âges.",
      mlLink: "https://www.mercadolivre.com.br/p/anniversaire-digital", // Exemple
      color: "bg-yellow-50"
    },
    { 
      icon: <Church className="text-amber-600" />, 
      title: "Baptême", 
      desc: "Un moment sacré partagé avec vos proches.",
      mlLink: "https://www.mercadolivre.com.br/p/bapteme-digital", // Exemple
      color: "bg-amber-50"
    },
    { 
      icon: <Sparkles className="text-purple-500" />, 
      title: "Événement Pro", 
      desc: "Inaugurations et lancements de produits.",
      mlLink: "https://www.mercadolivre.com.br/p/pro-digital", // Exemple
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-primary">ConvitePro</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#categories" className="hover:text-primary transition-colors">Catégories</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Comment ça marche</a>
          <a href="#demo" className="hover:text-primary transition-colors">Démos</a>
        </div>
        <Button variant="outline" className="rounded-full px-6" onClick={() => navigate('/dashboard')}>Admin</Button>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} /> La plateforme n°1 d'invitations digitales
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Des invitations <span className="text-primary italic">magiques</span> pour chaque moment.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Choisissez votre type d'événement ci-dessous et recevez votre accès instantanément après l'achat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="rounded-full h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/20"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Choisir mon invitation
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full h-14 px-10 text-lg font-semibold gap-2" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                Voir les démos <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 bg-slate-100 rounded-[3rem] p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" 
                alt="Invitation Digitale" 
                className="rounded-[2.5rem] w-full h-[600px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Sélectionnez votre Événement</h2>
            <p className="text-slate-500">Chaque invitation est optimisée pour son type de célébration.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-full"
              >
                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 text-2xl`}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{cat.desc}</p>
                
                <Button 
                  className="w-full rounded-2xl h-12 font-bold gap-2"
                  onClick={() => window.open(cat.mlLink, '_blank')}
                >
                  <ShoppingBag size={18} /> Acheter sur Mercado Livre
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-24 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Choisissez votre Style Visuel</h2>
            <p className="text-slate-500">Trois thèmes exclusifs qui s'adaptent à tous vos événements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "classic", title: "Classique", desc: "Élégance intemporelle avec des polices avec empattement.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" },
              { id: "modern", title: "Moderne", desc: "Minimalisme contemporain et typographie audacieuse.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400" },
              { id: "romantic", title: "Romantique", desc: "Délicatesse florale et animations douces.", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=400" }
            ].map((demo, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100"
              >
                <img src={demo.img} alt={demo.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-3">{demo.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{demo.desc}</p>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl"
                    onClick={() => navigate(`/demo/${demo.id}`)}
                  >
                    Voir l'exemple
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Comment ça marche ?</h2>
            <p className="text-slate-500">Trois étapes simples pour votre invitation parfaite.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShoppingBag className="h-10 w-10" />, title: "1. Achetez", desc: "Achetez votre accès exclusif via Mercado Livre en toute sécurité." },
              { icon: <Wand2 className="h-10 w-10" />, title: "2. Personnalisez", desc: "Remplissez les détails de votre événement sur notre plateforme." },
              { icon: <Share2 className="h-10 w-10" />, title: "3. Partagez", desc: "Générez votre lien exclusif et envoyez-le à vos invités via WhatsApp." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 text-center"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;