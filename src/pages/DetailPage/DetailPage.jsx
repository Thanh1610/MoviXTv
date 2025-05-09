import Filters from '@/layouts/components/Filters';
import MovieListSmall from '@/layouts/components/MovieListSmall';
import * as animationTvServices from '@/apiServices/animationTvServices';
import * as animationMovieServices from '@/apiServices/animationMovieServices';
import * as detailServices from '@/apiServices/detailServices';
import { useFilters } from '@/hook/useFilters';
import MovieDetail from '@/components/MovieDetail';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

function DetailPage() {
    const [info, setInfo] = useState({});
    const { applyFilters } = useFilters();
    const location = useLocation();
    const { id, type } = location.state || {};

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await detailServices.detail(id, type);
                result ? setInfo(result) : setInfo({});
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchApi();
    }, [id, type]);

    return (
        <div className="bg-[#151d25]">
            <Filters onApplyFilters={applyFilters} />

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-[70%]">
                    <MovieDetail data={info} />
                </div>
                <div className="w-full lg:w-[30%]">
                    <MovieListSmall
                        title="Hoạt Hình Bộ AnimeTv"
                        fetchMovies={animationTvServices.animationTv}
                        limit={5}
                    />

                    <MovieListSmall
                        title="Hoạt Hình Lẻ AnimeTv"
                        fetchMovies={animationMovieServices.animationMovie}
                        limit={5}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
