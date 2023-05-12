import Card2 from "./Card2";

export default function Cards({ especialidad }) {
  
    return (
        <div className="flex flex-wrap w-full flex-row  items-center justify-center min-h-screen container mx-auto">
            {especialidad.map(({ name,url, description }, index) => {
                return <Card 
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px] container">
            {especialidad.map(({ name, image, description }, index) => {
                return <Card2 
                key={index}
                name={name} 
                image={url} 
                description={description} />;
            })}
        </div>
    );
}
