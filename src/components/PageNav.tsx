import styles from "./styles/PageNav.module.scss";

export interface PageNavProps {
    setPage: (page: number) => void;
    page: number;
    totalPages: number;
}

const PageNav: React.FC<PageNavProps> = ({ setPage, page, totalPages }) => {

    const mapState1 = () => {
        const options = [];
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
            options.push(
                <h5 key={i} onClick={() => { page != i ? setPage(i) : "" }} className={i === page ? styles.page : ""}>
                    {i}
                </h5>
            );
        }
        if (totalPages > 6) {
            options.push(
                <h5 key={"dots"} className={styles.dots} >
                    {"..."}
                </h5>
            )
            options.push(
                <h5 key={totalPages} onClick={() => setPage(totalPages)}>
                    {totalPages}
                </h5>
            )
        }
        else if (totalPages > 5) {
            options.push(
                <h5 key={totalPages} onClick={() => setPage(totalPages)}>
                    {totalPages}
                </h5>
            )
        }

        return options;

    }
    const mapState2 = () => {
        const options = [];
        options.push(
            <h5 key={1} onClick={() => setPage(1)}>
                {1}
            </h5>,
            <h5 key={"dots"} className={styles.dots}>
                {"..."}
            </h5>,
            <h5 key={page - 1} onClick={() => setPage(page - 1)}>
                {page - 1}
            </h5>,
            <h5 key={page} className={styles.page}>
                {page}
            </h5>,
            <h5 key={page + 1} onClick={() => setPage(page + 1)}>
                {page + 1}
            </h5>,
            <h5 key={"dots2"}>
                {"..."}
            </h5>,
            <h5 key={totalPages} onClick={() => setPage(totalPages)}>
                {totalPages}
            </h5>,
        )
        return options;

    }
    const mapState3 = () => {
        const options = [];
        options.push(
            <h5 key={1} onClick={() => setPage(1)}>
                {1}
            </h5>,
            <h5 key={"dots"} className={styles.dots}>
                {"..."}
            </h5>
        )
        for (let i = totalPages - 5; i <= totalPages; i++) {
            options.push(
                <h5 key={i} onClick={() => { page != i ? setPage(i) : "" }} className={i === page ? styles.page : ""}>
                    {i}
                </h5>
            )
        }
        return options;
    }
    const mapOptions = () => {
        if (page < 5) {
            return mapState1();
        }
        else if (page < totalPages - 5) {
            return mapState2();
        }
        else {
            return mapState3();
        }
    }
    const navigateToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const navigateToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.division}>
            <img src="/icons8-less-than-90.png" onClick={navigateToPreviousPage} />
            {mapOptions()}
            <img src="/icons8-more-than-90.png" onClick={navigateToNextPage} />
        </div>
    );
};

export default PageNav;
