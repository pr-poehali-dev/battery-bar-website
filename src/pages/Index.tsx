import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  time: string;
  genre: string;
  description: string;
  price: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'drinks' | 'food' | 'cocktails';
}

const events: Event[] = [
  {
    id: 1,
    title: "Рок вечер",
    artist: "The Electric Band",
    date: "2024-09-20",
    time: "21:00",
    genre: "Rock",
    description: "Зажигательный рок концерт с лучшими кавер-версиями",
    price: "1500₽"
  },
  {
    id: 2,
    title: "Джазовый вечер",
    artist: "Smooth Jazz Quartet",
    date: "2024-09-22",
    time: "20:30",
    genre: "Jazz",
    description: "Уютная атмосфера с классическими джазовыми композициями",
    price: "1200₽"
  },
  {
    id: 3,
    title: "Акустика",
    artist: "Solo Acoustic",
    date: "2024-09-25",
    time: "19:00",
    genre: "Acoustic",
    description: "Камерный концерт с акустическими версиями хитов",
    price: "800₽"
  }
];

const menuItems: MenuItem[] = [
  { id: 1, name: "Классический бургер", description: "Сочная котлета, свежие овощи", price: "650₽", category: "food" },
  { id: 2, name: "Крафтовое пиво", description: "Свежее пиво от местной пивоварни", price: "350₽", category: "drinks" },
  { id: 3, name: "Батарейка", description: "Фирменный коктейль заведения", price: "450₽", category: "cocktails" },
  { id: 4, name: "Куриные крылышки", description: "Острые крылышки с соусом", price: "480₽", category: "food" },
  { id: 5, name: "Мохито", description: "Классический коктейль с мятой", price: "420₽", category: "cocktails" }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold text-primary">Батарейка</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'events', label: 'Афиша' },
                { id: 'menu', label: 'Меню' },
                { id: 'gallery', label: 'Галерея' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`hover:text-primary transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Бронировать
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card">
                <DialogHeader>
                  <DialogTitle className="text-card-foreground">Бронирование столика</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Ваше имя"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                  <Input
                    placeholder="Телефон"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                    <Input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Количество гостей"
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                  />
                  <Textarea
                    placeholder="Дополнительные пожелания"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  />
                  <Button className="w-full">Забронировать</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/img/a6df3efb-19c3-44c6-9162-044d37b5a3f0.jpg)' }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl py-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Кавер-бар
              <span className="block text-primary animate-float">Батарейка</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in">
              Первый кавер-бар в Москве. Место, где оживает музыка. Каждый вечер — новые эмоции, талантливые исполнители и незабываемая атмосфера.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => scrollToSection('events')}
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Посмотреть афишу
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('menu')}
              >
                <Icon name="Menu" size={20} className="mr-2" />
                Меню
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Афиша мероприятий</h3>
            <p className="text-xl text-foreground/70">Расписание выступлений на ближайшие дни</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {event.genre}
                    </Badge>
                    <span className="text-lg font-bold text-primary">{event.price}</span>
                  </div>
                  <CardTitle className="text-card-foreground">{event.title}</CardTitle>
                  <p className="text-primary font-semibold">{event.artist}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-card-foreground/70">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-card-foreground/70">
                      <Icon name="Clock" size={16} className="mr-2" />
                      {event.time}
                    </div>
                    <p className="text-card-foreground/80 text-sm">{event.description}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4">
                          <Icon name="Ticket" size={16} className="mr-2" />
                          Купить билет
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Покупка билета: {event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="text-center py-8">
                          <Icon name="Phone" size={48} className="mx-auto mb-4 text-primary" />
                          <p className="text-lg mb-2">Для покупки билетов звоните:</p>
                          <p className="text-2xl font-bold text-primary">+7 (495) 123-45-67</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Меню</h3>
            <p className="text-xl text-foreground/70">Вкусная еда и напитки для отличного вечера</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {['food', 'drinks', 'cocktails'].map((category) => (
              <div key={category}>
                <h4 className="text-2xl font-bold mb-6 text-center">
                  {category === 'food' && '🍔 Еда'}
                  {category === 'drinks' && '🍺 Напитки'}
                  {category === 'cocktails' && '🍸 Коктейли'}
                </h4>
                <div className="space-y-4">
                  {menuItems.filter(item => item.category === category).map((item) => (
                    <Card key={item.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-semibold text-card-foreground">{item.name}</h5>
                            <p className="text-sm text-card-foreground/70">{item.description}</p>
                          </div>
                          <span className="text-lg font-bold text-primary ml-4">{item.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Галерея</h3>
            <p className="text-xl text-foreground/70">Атмосфера нашего заведения</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden bg-card border-border hover:scale-105 transition-transform duration-300">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Icon name="Image" size={48} className="text-primary/50" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Контакты</h3>
            <p className="text-xl text-foreground/70">Найдите нас и свяжитесь с нами</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Icon name="MapPin" className="mr-2 text-primary" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-card-foreground">г. Москва, ул. Музыкальная, 15</p>
                <div className="flex items-center">
                  <Icon name="Phone" className="mr-2 text-primary" size={16} />
                  <span className="text-card-foreground">+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" className="mr-2 text-primary" size={16} />
                  <span className="text-card-foreground">info@batareyka-bar.ru</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" className="mr-2 text-primary" size={16} />
                  <span className="text-card-foreground">Ежедневно 18:00 - 02:00</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Связаться с нами</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input placeholder="Email или телефон" />
                <Textarea placeholder="Ваше сообщение" rows={4} />
                <Button className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Zap" className="text-primary" size={24} />
            <h1 className="text-xl font-bold text-primary">Батарейка</h1>
          </div>
          <p className="text-foreground/60">&copy; 2024 Кавер-бар Батарейка. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}