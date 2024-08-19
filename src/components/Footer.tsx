const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="border-t-[1px] px-4 py-2 bottom-0 w-full">
            <div className="flex justify-between container-2xl">
                <h5 className="lg-max:hidden">
                    SmartPlants
                </h5>
                <h5>
                    Copyright © {currentYear}
                </h5>
                <h5>
                    Site design by SD
                </h5>
            </div>
        </div>
    );
};

export default Footer;
