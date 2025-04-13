function Team() {
    const teamMembers = [
        {
            name: "Riya Jain",
            role: "Product Manager",
            image: " "
        },
        {
            name: "Khushi Kaushik",
            role: "Lead Developer",
            // image: "/images/brian.jpg"
        },
        {
            name: "Evan Miller",
            role: "UI/UX Designer",
            // image: "/images/carmen.jpg"
        },
        {
            name: "Vidit Naik",
            role: "Data Scientist",
            // image: "/images/daniel.jpg"
        }
    ];

    return (
        <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", textAlign: "center" }}>
            <h1 style={{ fontSize: "3rem", marginTop: "60px", marginBottom: "40px" }}>Meet the Team</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '40px',
                padding: '0 20px',
            }}>
                {teamMembers.map((member, index) => (
                    <div key={index} style={{ maxWidth: "200px" }}>
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                border: "4px solid #fff",
                                marginBottom: "15px"
                            }} 
                        />
                        <h3 style={{ margin: "10px 0 5px" }}>{member.name}</h3>
                        <p style={{ fontSize: "0.95rem", color: "#ccc" }}>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Team;