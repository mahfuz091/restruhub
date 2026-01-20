import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const JoinTeam = () => {
    return (
        <section className="py-20 bg-primary/5 rounded-3xl overflow-hidden my-20">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-5/12">
                        <div className="relative aspect-square max-w-md mx-auto">
                            <Image
                                src="/images/team.png"
                                fill
                                alt="Thrive at Restuhub"
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-7/12 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
                            Thrive, Build, and Belong at <span className="text-secondary">Restuhub</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                            Step into a workplace where your ideas matter. At Restuhub, we
                            nurture individual talent while working as one bold, creative
                            team. Here, your growth, passion, and impact shape tomorrow&apos;s best
                            digital experiences.
                        </p>
                        <Link
                            href="/careers"
                            className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-secondary/20"
                        >
                            Join Our Team
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinTeam;
