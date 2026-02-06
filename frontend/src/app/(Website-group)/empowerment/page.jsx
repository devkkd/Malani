"use client";
import Container from '@/components/website/Container';
import EthicalFoundation from '@/components/website/EthicalData';

const EmpowermentPage = () => {
    return (
        <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
            <Container>
                <div className=" mx-auto">

                    {/* --- Header Section --- */}
                    <div className="text-center mb-16 space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
                            Empowerment Malani Impex
                        </h1>

                        <div className="space-y-2 pt-4">
                            <p className="text-black text-lg md:text-xl font-medium">
                                Transforming Lives
                            </p>
                            <p className="text-black text-lg md:text-xl font-medium">
                                Through Dignified Work and Fair Opportunity
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto pt-8">
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                At Malani Impex, women's empowerment isn't merely a value it is the very heart of everything we do.
                                For over four decades, we have been deeply honored to create meaningful opportunities for women artisans to achieve financial independence, break cycles of poverty, and emerge as respected leaders in their communities.
                                Every purchase you make directly supports a woman artisan's inspiring journey toward dignity, independence, and genuine hope.
                            </p>
                        </div>
                    </div>

                    {/* --- Documentary / Video Section --- */}
                    <div className="mt-20 space-y-5 text-left">
                        <div className="space-y-2">
                            <h2 className="text-[#666141] text-2xl md:text-3xl font-normal opacity-90">
                                Behind the Craft: A Documentary
                            </h2>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl text-black leading-tight">
                                Witness the Skill, Dedication, and Artistry of Our Craftspeople
                            </h3>
                        </div>

                        <div className="max-w-3xl space-y-1">
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                Step into the world of our remarkable artisans.
                            </p>
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                Through this visual journey, you'll witness the extraordinary skill, unwavering dedication, and breathtaking artistry that goes into every single piece we create.
                            </p>
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                This isn't just manufacturing it's mastery.
                            </p>
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                These aren't just workers they're artists, breadwinners, community leaders, and guardians of ancient traditions.
                            </p>
                        </div>

                        {/* Video Placeholder Box */}
                        <div className="w-full aspect-[16/6.5] bg-black/5 mt-8 rounded-sm overflow-hidden relative group cursor-pointer">
                            {/* Replace this div with your <video> tag or Youtube Embed */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
                                </div>
                            </div>
                            {/* Optional: Add an image tag here for the thumbnail */}
                            {/* <img src="/path-to-thumbnail.jpg" className="w-full h-full object-cover" /> */}
                        </div>

                    </div>
                    {/*  */}
                    {/* --- Section: The Journey of a Thousand Hands --- */}
                    <div className="mt-24 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-[#666141] text-xl md:text-2xl font-normal opacity-90">
                                The Journey of a Thousand Hands
                            </h2>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
                                Follow the Complete Journey from Raw Fabric to Finished Product
                            </h3>
                            <div className="max-w-4xl pt-2">
                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    Follow the complete journey from raw fabric to finished product, witnessing the skill, dedication, and artistry of our craftspeople. Each stage represents hours of devoted work, generations of inherited knowledge, and the loving care of skilled hands.
                                </p>
                            </div>
                        </div>

                        {/* Image Grid (3 Images) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                            {[
                                '/images/empowerment/empowerment1.jpg',
                                '/images/empowerment/empowerment2.jpg',
                                '/images/empowerment/empowerment3.jpg'
                            ].map((src, index) => (
                                <div key={index} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100">
                                    <img
                                        src={src}
                                        alt={`Artisan Journey ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Section: Empowering Women --- */}
                    <div className="py-8 border-t border-[#666141]/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[#666141] text-xl md:text-2xl font-normal opacity-90 block">
                                        Empowering Women
                                    </span>
                                    <h3 className="text-2xl md:text-3xl text-[#666141] font-normal leading-tight opacity-80">
                                        More Than Employment - A Movement for Dignity and Independence
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
                                        Celebrating Women Artisans, Stitch by Stitch
                                    </h2>
                                    <p className="text-black text-sm md:text-base leading-relaxed pt-2">
                                        Over 90% of our artisans are women who are the primary breadwinners for their families. By preserving traditional crafts, we're not just keeping heritage alive we're building futures, transforming communities, and proving that economic empowerment and cultural preservation can flourish together.
                                    </p>
                                </div>
                            </div>

                            {/* Right Image (Large) */}
                            <div className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden rounded-sm">
                                <img
                                    src="/images/empowerment/empowerment4.jpg"
                                    alt="Women Artisans Working"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                        </div>
                    </div>
                    {/* --- Section: Skills Training --- */}
                    <div className="py-8 border-t border-[#666141]/10 ">

                        {/* Header & Icon */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                            <div className="space-y-4 max-w-3xl">
                                <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                    Skills Training
                                </h2>
                                <h3 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                                    Building Expertise, Building Confidence
                                </h3>
                            </div>

                            {/* Flower Icon */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                <img
                                    src="/images/empowerment/empowerment5.png"
                                    alt="Flower Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-2 mb-12 max-w-4xl">
                            <h4 className="text-black text-base font-medium">
                                Our Comprehensive Programs
                            </h4>
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                We provide comprehensive training programs teaching traditional techniques to new artisans. Our programs go far beyond basic skills we provide thorough training in:
                            </p>
                        </div>

                        {/* 3 Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Card 1 */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Traditional Craft Techniques
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Hand block printing mastery",
                                        "Intricate embroidery styles (Chikan, Kantha, etc.)",
                                        "Natural dyeing methods",
                                        "Quality control standards",
                                        "Advanced pattern work"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Business & Life Skills
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Financial literacy and savings",
                                        "Basic reading and writing (for those who need it)",
                                        "Leadership and communication",
                                        "Health and nutrition awareness",
                                        "Legal rights education"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Investment in Excellence
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "3-6 month comprehensive training programs",
                                        "Paid apprenticeships (artisans earn while learning)",
                                        "Ongoing skill development workshops",
                                        "Advanced technique certifications"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                    {/* --- Section: Fair Wages --- */}
                    <div className="py-8 border-t border-[#666141]/10 ">

                        {/* Header & Icon */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                            <div className="space-y-4 max-w-3xl">
                                <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                    Fair Wages
                                </h2>
                                <h3 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                                    Compensation That Reflects True Value
                                </h3>
                            </div>

                            {/* Hand/Heart Icon */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                <img
                                    src="/images/empowerment/empowerment6.png"
                                    alt="Fair Wages Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-2 mb-12 max-w-4xl">
                            <h4 className="text-black text-base font-medium">
                                Our Commitment to Ethical Compensation:
                            </h4>
                            <p className="text-black text-sm md:text-base leading-relaxed">
                                We are committed to ethical practices and deliver mindful compensation. Our artisans earn 35% above the national average, with wages 40–60% above regional minimums. This isn't charity it's recognizing the true value of skilled craftsmanship.
                            </p>
                        </div>

                        {/* 3 Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Card 1: What Fair Wages Mean */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    What Fair Wages Mean
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-black mt-0.5">✓</span>
                                        <div>
                                            <span className=' mr-1' >Living Wages:</span>
                                            <span className="opacity-90">Enough to cover basic needs PLUS discretionary income</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-black mt-0.5">✓</span>
                                        <div>
                                            <span className=' mr-1' >Prompt Payment:</span>
                                            <span className="opacity-90">Paid reliably on time, every single time—no delays, no excuses</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-black mt-0.5">✓</span>
                                        <div>
                                            <span className=' mr-1' >Performance Bonuses:</span>
                                            <span className="opacity-90">Additional compensation for exceptional work</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-black mt-0.5">✓</span>
                                        <div>
                                            <span className=' mr-1' >Festival Bonuses:</span>
                                            <span className="opacity-90">Special payments during Diwali and other major festivals</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-black mt-0.5">✓</span>
                                        <div>
                                            <span className=' mr-1' >Transparent Pay Structure:</span>
                                            <span className="opacity-90">Artisans know exactly how compensation is calculated</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 2: The Ripple Effect */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    The Ripple Effect
                                </h4>
                                <div className="space-y-4">
                                    <p className="text-sm text-black font-medium">
                                        When women earn fair wages, entire families benefit:
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            "Children attend school instead of working",
                                            "Healthcare becomes accessible",
                                            "Homes are improved and mortgages paid",
                                            "Savings and financial security grow",
                                            "Community economic vitality increases"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                                <span className="font-bold text-black mt-0.5">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Card 3: Financial Independence */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Financial Independence
                                </h4>
                                <div className="space-y-4">
                                    <p className="text-sm text-black font-medium">
                                        Many of our artisans have achieved remarkable milestones:
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            "Purchased their own homes",
                                            "Sent children to college",
                                            "Started small businesses",
                                            "Invested in their futures",
                                            "Broken generational poverty cycles"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                                <span className="font-bold text-black mt-0.5">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* --- Section: Community Impact --- */}
                    <div className="py-8 border-t border-[#666141]/10">

                        {/* Header & Icon */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                            <div className="space-y-4 max-w-3xl">
                                <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                    Community Impact
                                </h2>
                                <h3 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                                    Transforming Lives and Building Sustainable Futures
                                </h3>
                            </div>

                            {/* Family/Community Icon */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                <img
                                    src="/images/empowerment/empowerment7.png"
                                    alt="Community Impact Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-6 mb-16 max-w-5xl">
                            <div className="space-y-2">
                                <h4 className="text-black text-base font-medium">The Broader Impact:</h4>
                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    Transforming lives and building sustainable futures extends far beyond individual artisans. Over 200 families have achieved financial independence through our fair employment practices.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-black text-base font-medium">Educational Impact:</h4>
                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    The children of our artisans now attend school regularly, with many advancing to college breaking the cycle of limited opportunity.
                                </p>
                            </div>
                        </div>

                        {/* Two Column Grid (Education & Results) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16 border-t border-b border-[#666141]/10 py-12">

                            {/* Left: Education Support */}
                            <div className="space-y-6 md:border-r border-[#666141]/10">
                                <h3 className="text-2xl text-black font-normal">
                                    We support education through
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "School fee assistance programs",
                                        "Scholarship opportunities for artisan children",
                                        "Educational supply provisions",
                                        "After-school tutoring support"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: Our Results */}
                            <div className="space-y-6  md:pl-12 lg:pl-24">
                                <h3 className="text-2xl text-black font-normal">
                                    Our Results
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "300+ children now attending school full-time",
                                        "50+ artisan children have graduated high school",
                                        "15+ students currently in college",
                                        "100% of our artisans' school-age children are enrolled"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 3 Cards Grid (Healthcare, Development, Metrics) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Card 1: Healthcare */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Healthcare Access, We provide
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Health insurance coverage",
                                        "Regular health screenings",
                                        "Maternal health support",
                                        "Emergency medical assistance",
                                        "Mental health resources"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Card 2: Community Development */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Community Development
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Clean water initiatives in artisan villages",
                                        "Community center development",
                                        "Women's support groups",
                                        "Literacy programs for adults",
                                        "Microfinance lending circles"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Card 3: Empowerment Metrics */}
                            <div className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">
                                <h4 className="text-xl text-black font-normal">
                                    Empowerment Metrics
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "85% of our artisans serve as primary breadwinners",
                                        "60% own their homes (vs. 15% before employment)",
                                        "70% have savings accounts",
                                        "90% report improved quality of life",
                                        "95% report increased confidence and self-worth"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                            <span className="font-bold text-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                    {/* --- Section: Meet the Women --- */}
                    <div className="py-8 border-t border-[#666141]/10">

                        {/* Header */}
                        <div className="mb-12">
                            <h2 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90 mb-2">
                                Meet the Women Proudly Working
                            </h2>
                            <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                The Remarkable Faces Behind Every Thread
                            </h3>
                        </div>

                        {/* Profiles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* We'll map through 6 dummy items to match the design */}
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-[#FFFCEA] p-8 rounded-[20px] space-y-6">

                                    {/* Profile Image Placeholder */}
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 border border-[#666141]/10">
                                        <img
                                            src="" // Empty as requested
                                            alt="profile pic"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Quote */}
                                    <p className="text-black text-sm leading-relaxed">
                                        "I learned this art from my grandmother. Every block tells a story, and when I press it onto fabric, I'm keeping that story alive."
                                    </p>

                                    {/* Name & Title */}
                                    <div className="space-y-1">
                                        <h4 className="text-black text-base font-medium">
                                            Geeta Devi
                                        </h4>
                                        <p className="text-black text-sm opacity-80">
                                            Master Artisan • 25 years of Experience
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <EthicalFoundation />
            </Container>
        </section>
    );
};

export default EmpowermentPage;