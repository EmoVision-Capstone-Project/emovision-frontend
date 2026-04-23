export default function Footer() {
  const teamMembers = [
    { name: "Atika Adelia", email: "cdcc119d6x2248@student.devacademy.id" }, // MINTA EMAIL DICODINGGGGGG!!!!!
    { name: "Fadina Mustika R.", email: "cfcc119d6x2423@student.devacademy.id" },
    { name: "Fadzilah Saputri", email: "cfcc119d6x2340@student.devacademy.id" },
    { name: "Elfa Noviana Sari", email: "cacc119D6X2318@student.devacademy.id" },
    { name: "Hildyah Maretasya A.", email: "cacc119d6x2214@student.devacademy.id" },
    { name: "Charista Septi D. A.", email: "cdcc183d6x2720@student.devacademy.id" }
  ];

  return (
    <footer className="bg-emo-secondary text-white py-12 px-10">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-center text-2xl font-bold mb-10 tracking-widest uppercase">
          Contact Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 text-center mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-medium opacity-80 mb-1">{member.name}</span>
              <span className="font-bold text-lg">{member.email}</span>
            </div>
          ))}
        </div>

        <hr className="border-white/40 mb-6" />
        <p className="text-center text-sm font-light tracking-wide">
          © 2026 EmoVision. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
}